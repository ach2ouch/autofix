// AutoPieces.tn — Jetour X70 specialized analyzer with real OEM references
// Parts database extracted from official Jetour X70 Hot Sale Parts List

// REAL OEM Jetour X70 parts database
const JETOUR_X70_PARTS_DB = {
  // ===== EXTERIOR / BODY =====
  "F01-4421010": { name: "Phare avant gauche", category: "éclairage", zone: "front_left", typicalNewPriceTND: 950, typicalUsedPriceTND: { min: 280, max: 480 } },
  "F01-4421020": { name: "Phare avant droit", category: "éclairage", zone: "front_right", typicalNewPriceTND: 950, typicalUsedPriceTND: { min: 280, max: 480 } },
  "F01-8401100NA": { name: "Calandre (Radiator grille)", category: "carrosserie", zone: "front_center", typicalNewPriceTND: 420, typicalUsedPriceTND: { min: 130, max: 250 } },
  "F01-2803505NA-DQ": { name: "Pare-chocs avant inférieur (apprêt)", category: "carrosserie", zone: "front_center", typicalNewPriceTND: 680, typicalUsedPriceTND: { min: 200, max: 380 } },

  // ===== MIRRORS =====
  "F01-8202010NB-DQ": { name: "Rétroviseur extérieur gauche (apprêt)", category: "carrosserie", zone: "left_side", typicalNewPriceTND: 380, typicalUsedPriceTND: { min: 110, max: 200 } },
  "F01-8202020NB-DQ": { name: "Rétroviseur extérieur droit (apprêt)", category: "carrosserie", zone: "right_side", typicalNewPriceTND: 380, typicalUsedPriceTND: { min: 110, max: 200 } },

  // ===== WINDSHIELDS =====
  "F01-5206020BB": { name: "Pare-brise arrière complet", category: "vitrage", zone: "windshield_rear", typicalNewPriceTND: 1200, typicalUsedPriceTND: { min: 350, max: 600 } },
  "F01-5206500": { name: "Pare-brise avant complet", category: "vitrage", zone: "windshield_front", typicalNewPriceTND: 1450, typicalUsedPriceTND: { min: 420, max: 720 } },

  // ===== DOORS =====
  "F01-6101010-DY": { name: "Porte avant gauche (électrophorèse)", category: "carrosserie", zone: "left_side", typicalNewPriceTND: 1850, typicalUsedPriceTND: { min: 550, max: 950 } },
  "F01-6101020-DY": { name: "Porte avant droite (électrophorèse)", category: "carrosserie", zone: "right_side", typicalNewPriceTND: 1850, typicalUsedPriceTND: { min: 550, max: 950 } },
  "F01-6201010-DY": { name: "Porte arrière gauche (électrophorèse)", category: "carrosserie", zone: "left_side", typicalNewPriceTND: 1750, typicalUsedPriceTND: { min: 520, max: 880 } },
  "F01-6201020-DY": { name: "Porte arrière droite (électrophorèse)", category: "carrosserie", zone: "right_side", typicalNewPriceTND: 1750, typicalUsedPriceTND: { min: 520, max: 880 } },

  // ===== DOOR GLASS =====
  "F01-5203110": { name: "Vitre porte avant gauche", category: "vitrage", zone: "left_side", typicalNewPriceTND: 380, typicalUsedPriceTND: { min: 110, max: 220 } },
  "F01-5203120": { name: "Vitre porte avant droite", category: "vitrage", zone: "right_side", typicalNewPriceTND: 380, typicalUsedPriceTND: { min: 110, max: 220 } },
  "F01-5203210": { name: "Vitre porte arrière gauche", category: "vitrage", zone: "left_side", typicalNewPriceTND: 320, typicalUsedPriceTND: { min: 95, max: 180 } },
  "F01-5203220": { name: "Vitre porte arrière droite", category: "vitrage", zone: "right_side", typicalNewPriceTND: 320, typicalUsedPriceTND: { min: 95, max: 180 } },

  // ===== TAIL LIGHTS =====
  "F01-4433010": { name: "Feu arrière gauche (partie fixe)", category: "éclairage", zone: "rear_left", typicalNewPriceTND: 580, typicalUsedPriceTND: { min: 170, max: 320 } },
  "F01-4433020": { name: "Feu arrière droit (partie fixe)", category: "éclairage", zone: "rear_right", typicalNewPriceTND: 580, typicalUsedPriceTND: { min: 170, max: 320 } },
  "F01-4433030": { name: "Feu arrière gauche (partie mobile/coffre)", category: "éclairage", zone: "trunk", typicalNewPriceTND: 520, typicalUsedPriceTND: { min: 150, max: 290 } },
  "F01-4433040": { name: "Feu arrière droit (partie mobile/coffre)", category: "éclairage", zone: "trunk", typicalNewPriceTND: 520, typicalUsedPriceTND: { min: 150, max: 290 } },

  // ===== WHEELS / SUSPENSION =====
  "F01-3001017": { name: "Moyeu de roue avant", category: "roues", zone: "front_center", typicalNewPriceTND: 280, typicalUsedPriceTND: { min: 80, max: 160 } },

  // ===== FUEL / FUNCTIONAL =====
  "J42-1103010": { name: "Trappe à carburant complète", category: "carrosserie", zone: "right_side", typicalNewPriceTND: 220, typicalUsedPriceTND: { min: 60, max: 130 } },
  "F01-3774130CB": { name: "Commodo essuie-glace (commande)", category: "électrique", zone: "front_center", typicalNewPriceTND: 240, typicalUsedPriceTND: { min: 70, max: 140 } },

  // ===== ENGINE / MECHANICAL =====
  "F01-1109111": { name: "Filtre à air", category: "mécanique", zone: "front_center", typicalNewPriceTND: 65, typicalUsedPriceTND: { min: 0, max: 0 } },
  "F01-8107048AC": { name: "Filtre habitacle (climatisation)", category: "mécanique", zone: "front_center", typicalNewPriceTND: 55, typicalUsedPriceTND: { min: 0, max: 0 } },
  "F4J16-3707010": { name: "Bougie d'allumage (assemblage)", category: "mécanique", zone: "front_center", typicalNewPriceTND: 90, typicalUsedPriceTND: { min: 0, max: 0 } },
  "F01-3502080": { name: "Plaquettes de frein arrière (paire)", category: "mécanique", zone: "underbody", typicalNewPriceTND: 220, typicalUsedPriceTND: { min: 0, max: 0 } },
  "F01-3501080": { name: "Plaquettes de frein avant (paire)", category: "mécanique", zone: "underbody", typicalNewPriceTND: 240, typicalUsedPriceTND: { min: 0, max: 0 } },
  "F01-3101010GA": { name: "Bague aluminium (assemblage)", category: "mécanique", zone: "underbody", typicalNewPriceTND: 95, typicalUsedPriceTND: { min: 30, max: 60 } },
  "480-1012010": { name: "Filtre à huile (assemblage)", category: "mécanique", zone: "underbody", typicalNewPriceTND: 35, typicalUsedPriceTND: { min: 0, max: 0 } },
  "F01-4004011BA": { name: "Liquide de transmission auto ATFSSVIII (1L)", category: "mécanique", zone: "underbody", typicalNewPriceTND: 75, typicalUsedPriceTND: { min: 0, max: 0 } },
  "F01-1500050": { name: "Bouchon de canal d'huile M3/8×24UNF2A", category: "mécanique", zone: "underbody", typicalNewPriceTND: 25, typicalUsedPriceTND: { min: 0, max: 0 } },
  "E4G18-1007080": { name: "Chaîne de distribution (assemblage)", category: "mécanique", zone: "underbody", typicalNewPriceTND: 580, typicalUsedPriceTND: { min: 180, max: 320 } },
};

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

    // Build a compact reference list for the AI
    const partsRefList = Object.entries(JETOUR_X70_PARTS_DB)
      .filter(([ref, p]) => p.typicalUsedPriceTND.max > 0) // Only resellable body parts (not consumables)
      .map(([ref, p]) => `${ref} | ${p.name} | zone:${p.zone}`)
      .join('\n');

    const prompt = `Tu es expert en pièces auto pour casse auto en Tunisie, spécialisé en JETOUR X70.

Le propriétaire d'une casse auto vient de récupérer cette voiture accidentée. Il veut savoir QUELLES PIÈCES sont ENCORE BONNES POUR LA REVENTE et combien il peut gagner.

Analyse la photo. Identifie:
1. Si c'est bien un Jetour X70 (sinon retourne {"error":"texte"})
2. Pour chaque ZONE de la voiture: est-elle endommagée (pièces à jeter) ou intacte (pièces à revendre)?
3. Position photoX, photoY (0-100%) de chaque zone endommagée

Liste SEULEMENT les pièces de carrosserie/vitrage/éclairage des zones VISIBLES sur la photo (5-8 pièces max). Pour chaque pièce, indique son état et si elle est revendable.

Réponds UNIQUEMENT en JSON valide (commence {, finit }, pas de markdown).

JSON exact:
{
  "vehicleConfirmed": true,
  "vehicleInfo": {"model":"X70","yearRange":"2018-2023","color":"","confidence":85},
  "overallCondition": {"severity":"moderate","severityScore":6,"summaryFR":"très court"},
  "damageZones": [{"zone":"front_center","severity":"severe","descriptionFR":"court","photoX":50,"photoY":50}],
  "earnings": {"totalMinTND":0,"totalMaxTND":0,"wholeCarValueTND":0,"upliftPercent":0},
  "partsAnalysis": [
    {
      "oemReference":"F01-4421010",
      "zone":"front_left",
      "salvageable":true,
      "condition":"Bon",
      "damageNotesFR":"très court"
    }
  ]
}

zones disponibles: front_left, front_center, front_right, left_side, right_side, rear_left, rear_center, rear_right, hood, roof, trunk, windshield_front, windshield_rear, underbody
overall severity: minor|moderate|severe|total_loss
zone severity: none|minor|moderate|severe
condition: Neuf|Bon|Moyen|Endommagé|Pour pièces

PIÈCES DISPONIBLES (utilise UNIQUEMENT ces références OEM exactes):
${partsRefList}

Pas un Jetour X70? {"error":"Cette voiture n'est pas un Jetour X70"}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 23000);

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
    let rawText = data.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
    console.log('=== Response length:', rawText.length, '===');

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
    // Salvage truncated
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
    }

    if (!parsed) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: "Format IA invalide. Réessayez." }) };
    }

    if (parsed.error) {
      return { statusCode: 200, headers, body: JSON.stringify(parsed) };
    }

    // ====== ENRICH AI RESPONSE WITH REAL DATABASE DATA ======
    const enrichedParts = (parsed.partsAnalysis || [])
      .map(p => {
        const dbPart = JETOUR_X70_PARTS_DB[p.oemReference];
        if (!dbPart) return null;
        const usedPrice = dbPart.typicalUsedPriceTND;
        return {
          oemReference: p.oemReference,
          nameFR: dbPart.name,
          category: dbPart.category,
          zone: dbPart.zone,
          salvageable: p.salvageable && usedPrice.max > 0,
          condition: p.condition,
          damageNotesFR: p.damageNotesFR || '',
          newPriceTND: dbPart.typicalNewPriceTND,
          usedPriceMinTND: usedPrice.min,
          usedPriceMaxTND: usedPrice.max,
        };
      })
      .filter(Boolean);

    // Recompute earnings from real database prices
    const salvageable = enrichedParts.filter(p => p.salvageable);
    const totalMin = salvageable.reduce((sum, p) => sum + (p.usedPriceMinTND || 0), 0);
    const totalMax = salvageable.reduce((sum, p) => sum + (p.usedPriceMaxTND || 0), 0);

    const finalResult = {
      vehicleConfirmed: parsed.vehicleConfirmed !== false,
      vehicleInfo: parsed.vehicleInfo || { model: 'X70' },
      overallCondition: parsed.overallCondition || {},
      damageZones: parsed.damageZones || [],
      earnings: {
        totalMinTND: totalMin,
        totalMaxTND: totalMax,
        wholeCarValueTND: parsed.earnings?.wholeCarValueTND || Math.round(totalMin * 0.6),
        upliftPercent: parsed.earnings?.upliftPercent || (totalMin > 0 ? Math.round(((totalMax - (parsed.earnings?.wholeCarValueTND || totalMin * 0.6)) / (parsed.earnings?.wholeCarValueTND || totalMin * 0.6)) * 100) : 0),
      },
      parts: enrichedParts,
      stats: {
        totalDetected: enrichedParts.length,
        salvageableCount: salvageable.length,
        damagedCount: enrichedParts.length - salvageable.length,
      }
    };

    return { statusCode: 200, headers, body: JSON.stringify(finalResult) };

  } catch (err) {
    if (err.name === 'AbortError') {
      return {
        statusCode: 504,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: "L'analyse a pris trop de temps. Réessayez — la deuxième tentative est souvent plus rapide." })
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
