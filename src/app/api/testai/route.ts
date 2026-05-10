import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function GET() {
  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 100,
      messages: [{ role: 'user', content: 'Say hello in one word.' }],
    })
    return Response.json({ success: true, reply: response.content[0] })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    return Response.json({ success: false, error: msg })
  }
}