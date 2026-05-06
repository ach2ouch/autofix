// AutoPieces.tn — Robust JSON parsing + Sonnet for reliability

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

    const prompt = `Tu es expert en pièces auto pour le marché tunisien (casse auto). Analyse cette photo de véhicule.

IMPORTANT: Réponds UNIQUEMENT avec du JSON valide. Pas de texte avant. Pas de texte après. Pas de markdown. Pas de \`\`\`. Commence directement par { et termine par }.

Voitures populaires en Tunisie: Peugeot 207/208/301, Renault Clio/Symbol/Megane, Citroën C-Elysée/C3, Hyundai i10/i20/Accent, Kia Picanto/Rio, VW Golf/Polo, Fiat Punto, Dacia Logan/Sandero.

Prix en TND (Dinars Tunisiens). RÉALISTE: petites pièces 30-150 DT, moyennes 100-500 DT, grosses 500-2000 DT.

Liste 8-12 pièces avec valeur de revente. Pour chaque pièce: 2-3 modèles compatibles en Tunisie.

Structure JSON exacte (respecte tous les champs):
{
  "vehicleIdentified": {"make":"Peugeot","model":"207","yearRange":"2006-2014","bodyType":"berline","color":"blanc","confidence":85},
  "overallCondition": {"severity":"severe","severityScore":7,"salvageRating":"good","summaryFR":"Choc frontal important..."},
  "damageZones": [{"zone":"front_center","severity":"severe","descriptionFR":"Pare-chocs détruit"}],
  "earnings": {"totalMinTND":2500,"totalMaxTND":4200,"wholeCarValueTND":1500,"potentialUpliftPercent":80},
  "parts": [{"id":"p1","nameFR":"Phare avant gauche","category":"éclairage","zone":"front_left","condition":"Bon","salvageable":true,"priceMinTND":120,"priceMaxTND":200,"demandLevel":"élevée","compatibleWith":["Peugeot 208 (2012-2019)","Citroën C3"],"notesFR":"Optique intact"}],
  "highDemandParts": ["Moteur","Boîte de vitesses","Phares"],
  "sellingTipsFR": ["Conseil 1","Conseil 2","Conseil 3"]
}

Valeurs autorisées:
- damageZones.zone: front_left, front_center, front_right, left_side, right_side, rear_left, rear_center, rear_right, hood, roof, trunk, windshield_front, windshield_rear, underbody
- damageZones.severity et overallCondition.severity: minor, moderate, severe, total_loss (pour overallCondition) ou none, minor, moderate, severe (pour zones)
- salvageRating: excellent, good, fair, poor
- parts.category: carrosserie, mécanique, électrique, intérieur, vitrage, éclairage, roues, autre
- parts.condition: Neuf, Bon, Moyen, Endommagé, Pour pièces
- parts.demandLevel: très élevée, élevée, moyenne, faible

Si pas une voiture: {"error":"Cette image ne montre pas un véhicule"}`;

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
        model: 'claude-sonnet-4-5',
        max_tokens: 3500,
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

    console.log('Raw AI response length:', rawText.length);
    console.log('First 200 chars:', rawText.substring(0, 200));

    // ROBUST JSON EXTRACTION
    // Strategy: try multiple cleanup approaches in order
    const tryParse = (str) => {
      try { return JSON.parse(str); } catch (e) { return null; }
    };

    let parsed = null;

    // Attempt 1: parse as-is
    parsed = tryParse(rawText.trim());

    // Attempt 2: remove markdown code fences
    if (!parsed) {
      const cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      parsed = tryParse(cleaned);
    }

    // Attempt 3: extract everything between first { and last }
    if (!parsed) {
      const firstBrace = rawText.indexOf('{');
      const lastBrace = rawText.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        const extracted = rawText.substring(firstBrace, lastBrace + 1);
        parsed = tryParse(extracted);
      }
    }

    // Attempt 4: try to fix common JSON errors (trailing commas, single quotes)
    if (!parsed) {
      let fixed = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const firstBrace = fixed.indexOf('{');
      const lastBrace = fixed.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        fixed = fixed.substring(firstBrace, lastBrace + 1);
      }
      // Remove trailing commas before closing brackets
      fixed = fixed.replace(/,(\s*[}\]])/g, '$1');
      parsed = tryParse(fixed);
    }

    if (parsed) {
      return { statusCode: 200, headers, body: JSON.stringify(parsed) };
    }

    // All parsing attempts failed - log full response for debugging
    console.error('All parse attempts failed. Full raw response:');
    console.error(rawText);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "L'IA n'a pas retourné un format valide. Réessayez ou utilisez une image plus claire.",
        debug: rawText.substring(0, 300)
      })
    };

  } catch (err) {
    if (err.name === 'AbortError') {
      return {
        statusCode: 504,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Analyse trop longue. Essayez avec une image plus petite.' })
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
