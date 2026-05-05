// Netlify serverless function - keeps your Anthropic API key safe on the server
// The API key is read from environment variables (set in Netlify dashboard)

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { imageBase64, imageMediaType } = JSON.parse(event.body);

    if (!imageBase64 || !imageMediaType) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing image data' }),
      };
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API key not configured on server' }),
      };
    }

    const prompt = `You are an expert automotive damage assessor. Analyze this image of a vehicle and provide a detailed damage report.

Respond ONLY with a valid JSON object (no markdown, no code fences, no preamble) in this exact structure:
{
  "vehicleIdentified": "make/model/type if identifiable, otherwise general description",
  "overallSeverity": "minor" | "moderate" | "severe" | "total_loss",
  "severityScore": <number 1-10>,
  "repairableAssessment": "fully_repairable" | "partially_repairable" | "not_economically_repairable",
  "estimatedRepairCostUSD": { "min": <number>, "max": <number> },
  "estimatedRepairTimeDays": { "min": <number>, "max": <number> },
  "damages": [
    { "area": "front bumper / hood / etc", "type": "dent / scratch / crack / etc", "severity": "minor" | "moderate" | "severe", "description": "brief description" }
  ],
  "partsNeeded": [
    { "name": "part name", "category": "body / mechanical / electrical / glass / etc", "estimatedCostUSD": { "min": <number>, "max": <number> }, "sourcingTips": "where this part is typically sourced" }
  ],
  "recommendedActions": ["action 1", "action 2"],
  "safetyWarnings": ["warning 1 if any"],
  "confidence": <number 0-100>
}

If the image is not a vehicle or you cannot assess damage, return: {"error": "explanation"}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: imageMediaType,
                  data: imageBase64,
                },
              },
              { type: 'text', text: prompt },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', errText);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: `AI service error: ${response.status}` }),
      };
    }

    const data = await response.json();
    let text = data.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('');
    text = text.replace(/```json|```/g, '').trim();

    try {
      const parsed = JSON.parse(text);
      return { statusCode: 200, headers, body: JSON.stringify(parsed) };
    } catch (parseErr) {
      console.error('Parse error:', parseErr, 'Raw:', text);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Could not parse AI response. Try a clearer image.' }),
      };
    }
  } catch (err) {
    console.error('Function error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server error: ' + err.message }),
    };
  }
};
