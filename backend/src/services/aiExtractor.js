import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function extractFromImage(filePath) {
  const imageData = fs.readFileSync(filePath).toString('base64')
  const ext = filePath.split('.').pop().toLowerCase()
  const mediaType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg'

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
    messages: [{
      role: 'user',
      content: [
        { type: 'image', source: { type: 'base64', media_type: mediaType, data: imageData } },
        { type: 'text', text: `Extract all data from this receipt/invoice. Return ONLY valid JSON with this structure:
{
  "vendor": "string",
  "date": "YYYY-MM-DD",
  "total": number,
  "currency": "USD",
  "items": [
    { "name": "string", "quantity": number, "unit": "string", "unitPrice": number, "totalPrice": number, "category": "string" }
  ],
  "paymentMethod": "string or null"
}
Categories: food_beverage, packaging, cleaning, office, utilities, equipment, other` }
      ]
    }]
  })

  const text = response.content[0].text.replace(/```json|```/g, '').trim()
  return JSON.parse(text)
}

export async function extractFromText(text) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [{
      role: 'user',
      content: `Extract expense data from this bank statement or CSV text. Return ONLY valid JSON array:
[{
  "vendor": "string",
  "date": "YYYY-MM-DD", 
  "total": number,
  "currency": "USD",
  "items": [{ "name": "string", "quantity": 1, "unit": "unit", "unitPrice": number, "totalPrice": number, "category": "string" }],
  "paymentMethod": "bank_transfer"
}]

Text to parse:
${text.substring(0, 4000)}`
    }]
  })

  const raw = response.content[0].text.replace(/```json|```/g, '').trim()
  return JSON.parse(raw)
}

export async function generateNegotiationInsight(vendorData) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 800,
    messages: [{
      role: 'user',
      content: `You are a procurement expert. Based on this vendor spend data, write a concise negotiation recommendation (2-3 sentences):
${JSON.stringify(vendorData, null, 2)}
Focus on: volume leverage, market rate gaps, contract terms to negotiate. Be specific with numbers.`
    }]
  })
  return response.content[0].text
}
