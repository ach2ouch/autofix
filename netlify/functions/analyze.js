// AutoPieces.tn — Multi-photo Jetour X70 analyzer
// Accepts up to 4 photos tagged front/rear/left/right
// Returns analysis with per-view damage zones and consolidated parts list

// REAL OEM Jetour X70 parts database (from the official PDF)
const JETOUR_X70_PARTS_DB = {
  "F01-4421010": { name: "Phare avant gauche", category: "éclairage", zone: "front_left", typicalNewPriceTND: 950, typicalUsedPriceTND: { min: 280, max: 480 } },
  "F01-4421020": { name: "Phare avant droit", category: "éclairage", zone: "front_right", typicalNewPriceTND: 950, typicalUsedPriceTND: { min: 280, max: 480 } },
  "F01-8401100NA": { name: "Calandre (Radiator grille)", category: "carrosserie", zone: "front_center", typicalNewPriceTND: 420, typicalUsedPriceTND: { min: 130, max: 250 } },
  "F01-2803505NA-DQ": { name: "Pare-chocs avant inférieur", category: "carrosserie", zone: "front_center", typicalNewPriceTND: 680, typicalUsedPriceTND: { min: 200, max: 380 } },
  "F01-8202010NB-DQ": { name: "Rétroviseur extérieur gauche", category: "carrosserie", zone: "left_side", typicalNewPriceTND: 380, typicalUsedPriceTND: { min: 110, max: 200 } },
  "F01-8202020NB-DQ": { name: "Rétroviseur extérieur droit", category: "carrosserie", zone: "right_side", typicalNewPriceTND: 380, typicalUsedPriceTND: { min: 110, max: 200 } },
  "F01-5206020BB": { name: "Pare-brise arrière complet", category: "vitrage", zone: "windshield_rear", typicalNewPriceTND: 1200, typicalUsedPriceTND: { min: 350, max: 600 } },
  "F01-5206500": { name: "Pare-brise avant complet", category: "vitrage", zone: "windshield_front", typicalNewPriceTND: 1450, typicalUsedPriceTND: { min: 420, max: 720 } },
  "F01-6101010-DY": { name: "Porte avant gauche", category: "carrosserie", zone: "left_side", typicalNewPriceTND: 1850, typicalUsedPriceTND: { min: 550, max: 950 } },
  "F01-6101020-DY": { name: "Porte avant droite", category: "carrosserie", zone: "right_side", typicalNewPriceTND: 1850, typicalUsedPriceTND: { min: 550, max: 950 } },
  "F01-6201010-DY": { name: "Porte arrière gauche", category: "carrosserie", zone: "left_side", typicalNewPriceTND: 1750, typicalUsedPriceTND: { min: 520, max: 880 } },
  "F01-6201020-DY": { name: "Porte arrière droite", category: "carrosserie", zone: "right_side", typicalNewPriceTND: 1750, typicalUsedPriceTND: { min: 520, max: 880 } },
  "F01-5203110": { name: "Vitre porte avant gauche", category: "vitrage", zone: "left_side", typicalNewPriceTND: 380, typicalUsedPriceTND: { min: 110, max: 220 } },
  "F01-5203120": { name: "Vitre porte avant droite", category: "vitrage", zone: "right_side", typicalNewPriceTND: 380, typicalUsedPriceTND: { min: 110, max: 220 } },
  "F01-5203210": { name: "Vitre porte arrière gauche", category: "vitrage", zone: "left_side", typicalNewPriceTND: 320, typicalUsedPriceTND: { min: 95, max: 180 } },
  "F01-5203220": { name: "Vitre porte arrière droite", category: "vitrage", zone: "right_side", typicalNewPriceTND: 320, typicalUsedPriceTND: { min: 95, max: 180 } },
  "F01-4433010": { name: "Feu arrière gauche (partie fixe)", category: "éclairage", zone: "rear_left", typicalNewPriceTND: 580, typicalUsedPriceTND: { min: 170, max: 320 } },
  "F01-4433020": { name: "Feu arrière droit (partie fixe)", category: "éclairage", zone: "rear_right", typicalNewPriceTND: 580, typicalUsedPriceTND: { min: 170, max: 320 } },
  "F01-4433030": { name: "Feu arrière gauche (partie mobile)", category: "éclairage", zone: "trunk", typicalNewPriceTND: 520, typicalUsedPriceTND: { min: 150, max: 290 } },
  "F01-4433040": { name: "Feu arrière droit (partie mobile)", category: "éclairage", zone: "trunk", typicalNewPriceTND: 520, typicalUsedPriceTND: { min: 150, max: 290 } },
  "F01-3001017": { name: "Moyeu de roue avant", category: "roues", zone: "front_center", typicalNewPriceTND: 280, typicalUsedPriceTND: { min: 80, max: 160 } },
  "J42-1103010": { name: "Trappe à carburant complète", category: "carrosserie", zone: "right_side", typicalNewPriceTND: 220, typicalUsedPriceTND: { min: 60, max: 130 } },
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
    const body = JSON.parse(event.body);
    // Support both old format (single image) and new format (images array)
    let images = [];
    if (body.images && Array.isArray(body.images)) {
      images = body.images.filter(img => img && img.imageBase64);
    } else if (body.imageBase64) {
      images = [{ imageBase64: body.imageBase64, imageMediaType: body.imageMediaType, viewLabel: 'unknown' }];
    }

    if (images.length === 0) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Aucune image fournie' }) };
    }
    if (images.length > 4) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Maximum 4 photos autorisées' }) };
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return { statusCode: 500, headers, body: JSON.stringify({ error: 'Clé API non configurée sur le serveur' }) };

    // Build parts reference list (only resellable body parts)
    const partsRefList = Object.entries(JETOUR_X70_PARTS_DB)
      .filter(([ref, p]) => p.typicalUsedPriceTND.max > 0)
      .map(([ref, p]) => `${ref} | ${p.name} | zone:${p.zone}`)
      .join('\n');

    const viewLabelsFR = {
      front: 'AVANT',
      rear: 'ARRIÈRE',
      left: 'CÔTÉ GAUCHE',
      right: 'CÔTÉ DROIT',
      unknown: 'VUE'
    };
    const photoDescriptions = images.map((img, i) =>
      `Photo ${i + 1}: ${viewLabelsFR[img.viewLabel] || 'VUE INCONNUE'}`
    ).join(', ');

    const prompt = `Tu es expert en pièces auto pour casse auto en Tunisie, spécialisé en JETOUR X70.

Tu reçois ${images.length} photo(s) du même véhicule (${photoDescriptions}). Analyse-les ensemble pour avoir une vue complète du véhicule.

Le propriétaire d'une casse auto veut savoir QUELLES PIÈCES sont ENCORE BONNES POUR LA REVENTE.

Pour chaque photo, indique sa vue (front/rear/left/right) et la liste des zones endommagées avec photoX, photoY (0-100%).
Liste les pièces visibles sur l'ensemble des photos (5-10 pièces max).

Réponds UNIQUEMENT en JSON valide (commence {, finit }, pas de markdown).

JSON exact:
{
  "vehicleConfirmed": true,
  "vehicleInfo": {"model":"X70","yearRange":"2018-2023","color":"","confidence":85},
  "overallCondition": {"severity":"moderate","severityScore":6,"summaryFR":"très court"},
  "photoAnalyses": [
    {
      "photoIndex": 0,
      "viewDetected": "front",
      "damageZones": [{"zone":"front_center","severity":"severe","descriptionFR":"court","photoX":50,"photoY":50}]
    }
  ],
  "damageZones": [{"zone":"front_center","severity":"severe","descriptionFR":"court"}],
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
viewDetected: front|rear|left|right
overall severity: minor|moderate|severe|total_loss
zone severity: none|minor|moderate|severe
condition: Neuf|Bon|Moyen|Endommagé|Pour pièces

PIÈCES DISPONIBLES (utilise UNIQUEMENT ces références OEM exactes):
${partsRefList}

Pas un Jetour X70? {"error":"Cette voiture n'est pas un Jetour X70"}`;

    // Build content blocks: all images then the text prompt
    const content = [];
    images.forEach((img, i) => {
      content.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: img.imageMediaType || 'image/jpeg',
          data: img.imageBase64
        }
      });
    });
    content.push({ type: 'text', text: prompt });

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
        max_tokens: 3000,
        messages: [{ role: 'user', content }],
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

    // Enrich with database
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

    const salvageable = enrichedParts.filter(p => p.salvageable);
    const totalMin = salvageable.reduce((sum, p) => sum + (p.usedPriceMinTND || 0), 0);
    const totalMax = salvageable.reduce((sum, p) => sum + (p.usedPriceMaxTND || 0), 0);
    const wholeCarValue = parsed.earnings?.wholeCarValueTND || Math.round(totalMin * 0.6);

    const finalResult = {
      vehicleConfirmed: parsed.vehicleConfirmed !== false,
      vehicleInfo: parsed.vehicleInfo || { model: 'X70' },
      overallCondition: parsed.overallCondition || {},
      damageZones: parsed.damageZones || [],
      photoAnalyses: parsed.photoAnalyses || [],
      photoCount: images.length,
      earnings: {
        totalMinTND: totalMin,
        totalMaxTND: totalMax,
        wholeCarValueTND: wholeCarValue,
        upliftPercent: wholeCarValue > 0 ? Math.round(((totalMax - wholeCarValue) / wholeCarValue) * 100) : 0,
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
        body: JSON.stringify({ error: "L'analyse a pris trop de temps. Réessayez avec moins de photos ou une seule." })
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
