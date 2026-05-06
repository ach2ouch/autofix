// AutoPieces.tn — With marketplace listings + photo coordinates

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

    const prompt = `Analyse cette photo de véhicule accidenté pour casse auto en Tunisie. Réponds UNIQUEMENT en JSON valide (commence par {, termine par }, pas de markdown).

Voitures populaires Tunisie: Peugeot 207/208, Renault Clio/Symbol, Citroën C3, Hyundai i10/i20, VW Golf, Dacia Logan.
Prix TND réalistes: petites pièces 30-150 DT, moyennes 100-500 DT, grosses 500-2000 DT.
Liste 6-8 pièces principales.

Pour chaque pièce: 2-3 annonces fictives mais RÉALISTES sur Tayara/Automobile.tn/Facebook Marketplace avec prix variés.
Pour chaque zone de dégât: position dans la photo en pourcentage (photoX, photoY de 0 à 100, où 0,0 = haut-gauche).

JSON exact:
{
  "vehicleIdentified": {"make":"","model":"","yearRange":"","bodyType":"","color":"","confidence":80},
  "overallCondition": {"severity":"moderate","severityScore":6,"salvageRating":"good","summaryFR":"résumé court"},
  "damageZones": [{"zone":"front_center","severity":"severe","descriptionFR":"court","photoX":50,"photoY":50}],
  "earnings": {"totalMinTND":2000,"totalMaxTND":3500,"wholeCarValueTND":1500,"potentialUpliftPercent":50},
  "parts": [
    {
      "id":"p1","nameFR":"","category":"carrosserie","zone":"front_left","condition":"Bon","salvageable":true,
      "priceMinTND":100,"priceMaxTND":250,"demandLevel":"élevée",
      "compatibleWith":["modèle 1","modèle 2"],"notesFR":"court",
      "marketListings":[
        {"site":"Tayara","title":"...","priceTND":180,"location":"Tunis","condition":"Bon état","sellerType":"Particulier"},
        {"site":"Automobile.tn","title":"...","priceTND":220,"location":"Sousse","condition":"Très bon","sellerType":"Casse auto"},
        {"site":"Facebook Marketplace","title":"...","priceTND":150,"location":"Sfax","condition":"Moyen","sellerType":"Particulier"}
      ]
    }
  ],
  "highDemandParts": ["pièce1","pièce2","pièce3"],
  "sellingTipsFR": ["conseil1","conseil2","conseil3"]
}

zones: front_left|front_center|front_right|left_side|right_side|rear_left|rear_center|rear_right|hood|roof|trunk|windshield_front|windshield_rear|underbody
severity overall: minor|moderate|severe|total_loss
severity zones: none|minor|moderate|severe
salvageRating: excellent|good|fair|poor
category: carrosserie|mécanique|électrique|intérieur|vitrage|éclairage|roues|autre
condition: Neuf|Bon|Moyen|Endommagé|Pour pièces
demandLevel: très élevée|élevée|moyenne|faible
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
    console.log('Response length:', rawText.length);

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
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Format IA invalide. Réessayez." }) };

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
