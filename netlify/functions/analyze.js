// AutoPieces.tn — Fixed: higher token limit + better JSON repair

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

IMPORTANT: Liste 5-6 pièces SEULEMENT. Pour chaque pièce, 2 annonces maximum. Sois concis dans toutes les descriptions (max 1 phrase courte chacune).

Pour chaque zone de dégât: position dans la photo en pourcentage (photoX, photoY de 0 à 100, où 0,0 = haut-gauche).

JSON exact:
{
  "vehicleIdentified": {"make":"","model":"","yearRange":"","bodyType":"","color":"","confidence":80},
  "overallCondition": {"severity":"moderate","severityScore":6,"salvageRating":"good","summaryFR":"court"},
  "damageZones": [{"zone":"front_center","severity":"severe","descriptionFR":"court","photoX":50,"photoY":50}],
  "earnings": {"totalMinTND":2000,"totalMaxTND":3500,"wholeCarValueTND":1500,"potentialUpliftPercent":50},
  "parts": [
    {
      "id":"p1","nameFR":"","category":"carrosserie","zone":"front_left","condition":"Bon","salvageable":true,
      "priceMinTND":100,"priceMaxTND":250,"demandLevel":"élevée",
      "compatibleWith":["modèle 1","modèle 2"],"notesFR":"court",
      "marketListings":[
        {"site":"Tayara","title":"court","priceTND":180,"location":"Tunis","condition":"Bon état","sellerType":"Particulier"},
        {"site":"Automobile.tn","title":"court","priceTND":220,"location":"Sousse","condition":"Très bon","sellerType":"Casse auto"}
      ]
    }
  ],
  "highDemandParts": ["pièce1","pièce2","pièce3"],
  "sellingTipsFR": ["c1","c2","c3"]
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
        max_tokens: 5000, // Increased to prevent truncation
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
    console.log('First 300 chars:', rawText.substring(0, 300));
    console.log('Last 300 chars:', rawText.substring(Math.max(0, rawText.length - 300)));

    const tryParse = (str) => { try { return JSON.parse(str); } catch (e) { return null; } };

    // Attempt 1: parse as-is
    let parsed = tryParse(rawText.trim());

    // Attempt 2: strip markdown
    if (!parsed) parsed = tryParse(rawText.replace(/```json/gi, '').replace(/```/g, '').trim());

    // Attempt 3: extract between first { and last }
    if (!parsed) {
      const first = rawText.indexOf('{');
      const last = rawText.lastIndexOf('}');
      if (first !== -1 && last > first) parsed = tryParse(rawText.substring(first, last + 1));
    }

    // Attempt 4: fix trailing commas
    if (!parsed) {
      let fixed = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const first = fixed.indexOf('{');
      const last = fixed.lastIndexOf('}');
      if (first !== -1 && last > first) fixed = fixed.substring(first, last + 1);
      fixed = fixed.replace(/,(\s*[}\]])/g, '$1');
      parsed = tryParse(fixed);
    }

    // Attempt 5: SALVAGE TRUNCATED RESPONSE
    // If response was cut off, try to close brackets/braces to make valid JSON
    if (!parsed) {
      let salvage = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const first = salvage.indexOf('{');
      if (first !== -1) salvage = salvage.substring(first);

      // Count open vs close brackets
      let openBrace = 0, openBracket = 0;
      let inString = false, escapeNext = false;
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

      // Try to find a clean cut point and close brackets
      // Remove the last incomplete item (look for last complete `},` or `],`)
      const lastCompleteObj = salvage.lastIndexOf('},');
      const lastCompleteArr = salvage.lastIndexOf('],');
      const cutPoint = Math.max(lastCompleteObj, lastCompleteArr);
      if (cutPoint > 0) {
        salvage = salvage.substring(0, cutPoint + 1);
        // Recount after truncation
        openBrace = 0; openBracket = 0; inString = false; escapeNext = false;
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
      }
      // Close any unclosed brackets/braces
      while (openBracket > 0) { salvage += ']'; openBracket--; }
      while (openBrace > 0) { salvage += '}'; openBrace--; }
      parsed = tryParse(salvage);
      if (parsed) console.log('✅ Salvaged truncated response');
    }

    if (parsed) {
      return { statusCode: 200, headers, body: JSON.stringify(parsed) };
    }

    console.error('All parse attempts failed.');
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
