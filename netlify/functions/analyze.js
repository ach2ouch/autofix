// AutoPieces.tn — Optimized for speed and reliability

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  try {
    const { imageBase64, imageMediaType } = JSON.parse(event.body);
    if (!imageBase64 || !imageMediaType) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Image manquante' }) };

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return { statusCode: 500, headers, body: JSON.stringify({ error: 'Clé API non configurée sur le serveur' }) };

    const prompt = `Analyse cette photo de véhicule pour casse auto en Tunisie.

Réponds UNIQUEMENT en JSON valide, commence par { et termine par }. Pas de markdown, pas de texte autour.

Voitures populaires en Tunisie: Peugeot 207/208, Renault Clio/Symbol, Citroën C3, Hyundai i10/i20, Kia Picanto, VW Golf, Dacia Logan.

Prix réalistes en TND: petites pièces 30-150 DT, moyennes 100-500 DT, grosses 500-2000 DT. Liste 8-10 pièces principales.

Format JSON exact:
{
  "vehicleIdentified": {"make":"","model":"","yearRange":"","bodyType":"","color":"","confidence":85},
  "overallCondition": {"severity":"moderate","severityScore":6,"salvageRating":"good","summaryFR":""},
  "damageZones": [{"zone":"front_center","severity":"severe","descriptionFR":""}],
  "earnings": {"totalMinTND":0,"totalMaxTND":0,"wholeCarValueTND":0,"potentialUpliftPercent":0},
  "parts": [{"id":"p1","nameFR":"","category":"carrosserie","zone":"front_left","condition":"Bon","salvageable":true,"priceMinTND":0,"priceMaxTND":0,"demandLevel":"élevée","compatibleWith":["",""],"notesFR":""}],
  "highDemandParts": ["",""],
  "sellingTipsFR": ["",""]
}

Valeurs zone: front_left, front_center, front_right, left_side, right_side, rear_left, rear_center, rear_right, hood, roof, trunk, windshield_front, windshield_rear, underbody
Valeurs severity (overallCondition): minor, moderate, severe, total_loss
Valeurs severity (zones): none, minor, moderate, severe
Valeurs salvageRating: excellent, good, fair, poor
Valeurs category: carrosserie, mécanique, électrique, intérieur, vitrage, éclairage, roues, autre
Valeurs condition: Neuf, Bon, Moyen, Endommagé, Pour pièces
Valeurs demandLevel: très élevée, élevée, moyenne, faible

Pas une voiture? Retourne: {"error":"explication courte"}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 24000);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 3000,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: imageMediaType, data: imageBase64 } },
              { type: 'text', text: prompt },
            ],
          },
        ],
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', errText);
      return { statusCode: response.status, headers, body: JSON.stringify({ error: `Erreur du service IA: ${response.status}` }) };
    }

    const data = await response.json();
    let rawText = data.content.filter((b) => b.type === 'text').map((b) => b.text).join('');

    console.log('Raw response length:', rawText.length);

    const tryParse = (str) => { try { return JSON.parse(str); } catch (e) { return null; } };

    let parsed = tryParse(rawText.trim());
    if (!parsed) parsed = tryParse(rawText.replace(/```json/gi, '').replace(/```/g, '').trim());
    if (!parsed) {
      const first = rawText.indexOf('{');
      const last = rawText.lastIndexOf('}');
      if (first !== -1 && last > first) parsed = tryParse(rawText.substring(first, last + 1));
    }
    if (!parsed) {
      let fixed = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const first = fixed.indexOf('{');
      const last = fixed.lastIndexOf('}');
      if (first !== -1 && last > first) fixed = fixed.substring(first, last + 1);
      fixed = fixed.replace(/,(\s*[}\]])/g, '$1');
      parsed = tryParse(fixed);
    }

    if (parsed) {
      return { statusCode: 200, headers, body: JSON.stringify(parsed) };
    }

    console.error('Parse failed. Raw:', rawText.substring(0, 500));
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "L'IA n'a pas retourné un format valide. Réessayez." })
    };

  } catch (err) {
    if (err.name === 'AbortError') {
      return {
        statusCode: 504,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Analyse trop longue. Image trop complexe ou serveur lent — réessayez.' })
      };
    }
    console.error('Function error:', err);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Erreur serveur: ' + err.message })
    };
  }
};
