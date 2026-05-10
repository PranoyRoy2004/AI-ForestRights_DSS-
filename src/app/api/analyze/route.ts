import Groq from 'groq-sdk'

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { text, fileName } = await req.json()

    const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: `You are an expert on India's Forest Rights Act 2006. Analyze this document and respond ONLY with a valid JSON object — no markdown, no explanation, no code blocks, just raw JSON.

Document name: ${fileName}
Document content: ${text}

Respond with exactly this JSON structure:
{
  "title": "document title or type",
  "summary": "2-3 sentence summary of the document",
  "claimType": "Individual or Community or Habitat or Unknown",
  "issues": ["issue 1", "issue 2"],
  "recommendations": ["recommendation 1", "recommendation 2"],
  "completeness": 75,
  "extractedData": {
    "applicantName": "",
    "village": "",
    "district": "",
    "area": "",
    "claimDate": ""
  }
}`,
      }],
    })

    const raw = response.choices[0]?.message?.content ?? ''
    const clean = raw.replace(/```json|```/g, '').trim()
    const analysis = JSON.parse(clean)
    return Response.json(analysis)
  } catch (error) {
    console.error('Analysis error:', error)
    return Response.json({ error: 'Failed to analyze document' }, { status: 500 })
  }
}