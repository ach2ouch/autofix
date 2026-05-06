// AutoPieces.tn — Buyer/owner side: repair cost analysis

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

    const prompt = `Analyse cette photo de véhicule accidenté pour estimer le COÛT DE RÉPARATION pour le propriétaire de la voiture en Tunisie. Réponds UNIQUEMENT en JSON valide (commence par {, termine par }, pas de markdown).

Voitures populaires Tunisie: Peugeot 207/208, Renault Clio/Symbol, Citroën C3, Hyundai i10/i20, VW Golf, Dacia Logan.
Prix TND réalistes pour acheter des pièces (occasion/neuf): petites pièces 30-150 DT, moyennes 100-500 DT, grosses 500-2000 DT.
Main d'œuvre garage tunisien: 30-50 DT/heure typique, 60-100 DT/h chez concessionnaire.

IMPORTANT: Liste 5-6 pièces SEULEMENT à remplacer/réparer. Pour chaque pièce, 2 annonces marché tunisien (Tayara, Automobile.tn, Facebook Marketplace, Affare.tn).
Pour chaque zone de dégât: position photoX, photoY (0-100%) où elle apparaît dans l'image.

JSON exact:
{
  "vehicleIdentified": {"make":"","model":"","yearRange":"","bodyType":"","color":"","confidence":80},
  "overallCondition": {"severity":"moderate","severityScore":6,"repairability":"economically_viable","summaryFR":"court"},
  "damageZones": [{"zone":"front_center","severity":"severe","descriptionFR":"court","photoX":50,"photoY":50}],
  "repairCost": {
    "partsMinTND":1000,
    "partsMaxTND":1800,
    "laborHours":12,
    "laborMinTND":400,
    "laborMaxTND":800,
    "totalMinTND":1400,
    "totalMaxTND":2600,
    "dealerEstimateTND":4500,
    "savingsPercent":45
  },
  "parts": [
    {
      "id":"p1","nameFR":"","category":"carrosserie","zone":"front_left","damageType":"choc/rayure/brisé/déformé",
      "actionRequired":"À remplacer|À réparer|À redresser|À repeindre",
      "buyPriceMinTND":80,"buyPriceMaxTND":200,
      "newPriceTND":450,
      "compatibleWith":["modèle 1","modèle 2"],
      "notesFR":"court conseil",
      "marketListings":[
        {"site":"Tayara","title":"court","priceTND":120,"location":"Tunis","condition":"Bon état","sellerType":"Particulier"},
        {"site":"Automobile.tn","title":"court","priceTND":150,"location":"Sousse","condition":"Très bon","sellerType":"Casse auto"}
      ]
    }
  ],
  "repairTimeDays": {"min":3,"max":7},
  "garageRecommendations": [
    {"type":"Carrossier indépendant","priceLevel":"économique","estimatedTND":1400,"description":"court"},
    {"type":"Garage agréé","priceLevel":"moyen","estimatedTND":2200,"description":"court"},
    {"type":"Concessionnaire","priceLevel":"premium","estimatedTND":4500,"description":"court"}
  ],
  "repairTipsFR": ["c1","c2","c3"]
}

zones: front_left|front_center|front_right|left_side|right_side|rear_left|rear_center|rear_right|hood|roof|trunk|windshield_front|windshield_rear|underbody
severity overall: minor|moderate|severe|total_loss
severity zones: none|minor|moderate|severe
repairability: economically_viable|costly_but_possible|not_economically_viable|total_loss
category: carrosserie|mécanique|électrique|intérieur|vitrage|éclairage|roues|autre
priceLevel: économique|moyen|premium
site: Tayara|Automobile.tn|Facebook Marketplace|Affare.tn
sellerType: Particulier|Casse auto|Professionnel
location: ville tunisienne

Pas une voiture? {"error":"texte"}`;

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
        model: 'claude-haiku-4-5',
        max_tokens: 5000,
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
    console.log('=== Raw response length:', rawText.length, '===');

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
    // Salvage truncated response
    if (!parsed) {
      let salvage = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const first = salvage.indexOf('{');
      if (first !== -1) salvage = salvage.substring(first);
      const lastCompleteObj = salvage.lastIndexOf('},');
      const lastCompleteArr = salvage.lastIndexOf('],');
      const cutPoint = Math.max(lastCompleteObj, lastCompleteArr);
      if (cutPoint > 0) salvage = salvage.substring(0, cutPoint + 1);

      let openBrace = 0, openBracket = 0, inString = false, escapeNext = false;
      for (let i = 0; i < salvage.length; i++) {
        const c = salvage[i];
        if (escapeNext) { escapeNext = false; continue; }
        if (c === '\\') { escapeNext = true; continue; }
        if (c === '"') inString = !inString;
        if (!inString) {
          if (c === '{') openBrace++;
          else if (c === '}') openBrace--;
          else if (c === '[') openBracket++;
          else if (c === ']') openBracket--;
        }
      }
      while (openBracket > 0) { salvage += ']'; openBracket--; }
      while (openBrace > 0) { salvage += '}'; openBrace--; }
      parsed = tryParse(salvage);
      if (parsed) console.log('✅ Salvaged truncated response');
    }

    if (parsed) {
      return { statusCode: 200, headers, body: JSON.stringify(parsed) };
    }

    console.error('Parse failed. Last 300:', rawText.substring(Math.max(0, rawText.length - 300)));
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Format IA invalide. Réessayez avec une autre photo." })
    };

  } catch (err) {
    if (err.name === 'AbortError') {
      return {
        statusCode: 504,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Timeout. Réessayez.' })
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
