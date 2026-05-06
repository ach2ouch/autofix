// AutoPieces.tn — Serverless function for AI car analysis
// Returns Tunisia-specific data: TND prices, French descriptions, compatibility info

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { imageBase64, imageMediaType } = JSON.parse(event.body);

    if (!imageBase64 || !imageMediaType) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Image manquante' }) };
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Clé API non configurée sur le serveur' }) };
    }

    const prompt = `Tu es un expert en pièces détachées automobiles spécialisé dans le marché tunisien (casse auto / pièces d'occasion). Analyse cette image de véhicule accidenté et fournis un rapport DÉTAILLÉ pour aider un vendeur de casse auto à maximiser ses revenus en vendant les pièces séparément.

Le marché de référence est la TUNISIE. Les voitures populaires sont: Peugeot 207/208/301, Renault Clio/Symbol/Megane, Citroën C-Elysée/C3, Hyundai i10/i20/Accent, Kia Picanto/Rio, Volkswagen Golf/Polo, Fiat Punto, Seat Ibiza, Dacia Logan/Sandero.

Les prix doivent être en DINARS TUNISIENS (TND/DT) et reflètent le marché de l'occasion tunisien.

Pour chaque pièce, indique aussi avec quels AUTRES modèles de voitures populaires en Tunisie elle est compatible (très important pour augmenter la visibilité du listing).

Réponds UNIQUEMENT avec un objet JSON valide (pas de markdown, pas de code fences, pas de préambule) avec EXACTEMENT cette structure:

{
  "vehicleIdentified": {
    "make": "marque (ex: Peugeot)",
    "model": "modèle (ex: 207)",
    "yearRange": "années estimées (ex: 2006-2014)",
    "bodyType": "berline / hatchback / SUV / break / etc",
    "color": "couleur",
    "confidence": <0-100>
  },
  "overallCondition": {
    "severity": "minor" | "moderate" | "severe" | "total_loss",
    "severityScore": <1-10>,
    "salvageRating": "excellent" | "good" | "fair" | "poor",
    "summaryFR": "résumé en français en 1-2 phrases"
  },
  "damageZones": [
    {
      "zone": "front_left" | "front_center" | "front_right" | "left_side" | "right_side" | "rear_left" | "rear_center" | "rear_right" | "hood" | "roof" | "trunk" | "windshield_front" | "windshield_rear" | "underbody",
      "severity": "none" | "minor" | "moderate" | "severe",
      "descriptionFR": "description courte en français"
    }
  ],
  "earnings": {
    "totalMinTND": <nombre>,
    "totalMaxTND": <nombre>,
    "wholeCarValueTND": <nombre - valeur si vendue entière comme épave>,
    "potentialUpliftPercent": <pourcentage de gain en vendant pièce par pièce vs entière>
  },
  "parts": [
    {
      "id": "id-unique-court",
      "nameFR": "nom de la pièce en français (ex: Phare avant gauche)",
      "category": "carrosserie" | "mécanique" | "électrique" | "intérieur" | "vitrage" | "éclairage" | "roues" | "autre",
      "zone": "même valeur que damageZones.zone",
      "condition": "Neuf" | "Bon" | "Moyen" | "Endommagé" | "Pour pièces",
      "salvageable": true | false,
      "priceMinTND": <nombre>,
      "priceMaxTND": <nombre>,
      "demandLevel": "très élevée" | "élevée" | "moyenne" | "faible",
      "compatibleWith": ["liste de modèles de voitures compatibles, ex: Peugeot 208 (2012-2019)", "Citroën C3 (2009-2016)"],
      "notesFR": "note courte: pourquoi ce prix, état particulier, conseils de vente"
    }
  ],
  "highDemandParts": ["liste des 3-5 noms de pièces les plus demandées de cette voiture en Tunisie"],
  "sellingTipsFR": ["conseil 1 en français", "conseil 2", "conseil 3"]
}

Sois RÉALISTE sur les prix tunisiens (généralement 30-150 TND pour petites pièces, 100-500 TND pour pièces moyennes, 500-2000 TND pour grosses pièces moteur/boîte).
Liste 8-15 pièces principales (pas trop, pas trop peu). Concentre-toi sur les pièces qui ont une vraie valeur de revente.
Si l'image n'est pas une voiture ou tu ne peux pas analyser, retourne: {"error": "explication en français"}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 4000,
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
      console.error('Parse error:', parseErr, 'Raw:', text);
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Impossible de parser la réponse IA. Essayez avec une image plus claire.' }) };
    }
  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Erreur serveur: ' + err.message }) };
  }
};
