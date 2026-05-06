// AutoPieces.tn — Optimized for speed (avoids Netlify timeout)

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

    const prompt = `Tu es expert en pièces auto pour le marché tunisien (casse auto). Analyse cette photo et retourne UNIQUEMENT un JSON valide (pas de markdown).

Voitures populaires en Tunisie: Peugeot 207/208/301, Renault Clio/Symbol/Megane, Citroën C-Elysée/C3, Hyundai i10/i20/Accent, Kia Picanto/Rio, VW Golf/Polo, Fiat Punto, Dacia Logan/Sandero.
Prix en TND (Dinars Tunisiens). Sois RÉALISTE: petites pièces 30-150 DT, moyennes 100-500 DT, grosses 500-2000 DT.

Liste 8-12 pièces principales avec valeur de revente. Pour chaque pièce, indique 2-3 modèles compatibles en Tunisie.

Structure JSON exacte:
{
  "vehicleIdentified": {"make":"","model":"","yearRange":"","bodyType":"","color":"","confidence":0},
  "overallCondition": {"severity":"minor|moderate|severe|total_loss","severityScore":0,"salvageRating":"excellent|good|fair|poor","summaryFR":""},
  "damageZones": [{"zone":"front_left|front_center|front_right|left_side|right_side|rear_left|rear_center|rear_right|hood|roof|trunk|windshield_front|windshield_rear|underbody","severity":"none|minor|moderate|severe","descriptionFR":""}],
  "earnings": {"totalMinTND":0,"totalMaxTND":0,"wholeCarValueTND":0,"potentialUpliftPercent":0},
  "parts": [{"id":"","nameFR":"","category":"carrosserie|mécanique|électrique|intérieur|vitrage|éclairage|roues|autre","zone":"","condition":"Neuf|Bon|Moyen|Endommagé|Pour pièces","salvageable":true,"priceMinTND":0,"priceMaxTND":0,"demandLevel":"très élevée|élevée|moyenne|faible","compatibleWith":[],"notesFR":""}],
  "highDemandParts": [],
  "sellingTipsFR": []
}

Si pas une voiture: {"error":"explication"}`;

    // 25 second timeout to stay under Netlify's 26s limit
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      signal: controller.signal,
      body: JSON.stringify({
        // Using Haiku for speed - 5-10x faster than Sonnet
        model: 'claude-haiku-4-5',
        max_tokens: 2500,
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
    let text = data.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
    text = text.replace(/```json|```/g, '').trim();

    try {
      const parsed = JSON.parse(text);
      return { statusCode: 200, headers, body: JSON.stringify(parsed) };
    } catch (parseErr) {
      console.error('Parse error:', parseErr, 'Raw:', text.substring(0, 500));
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Impossible de parser la réponse IA. Essayez avec une image plus claire.' }) };
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      return { statusCode: 504, headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Analyse trop longue. Essayez avec une image plus petite.' }) };
    }
    console.error('Function error:', err);
    return { statusCode: 500, headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Erreur serveur: ' + err.message }) };
  }
};
