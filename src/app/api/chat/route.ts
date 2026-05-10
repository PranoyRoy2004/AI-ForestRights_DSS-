import Groq from 'groq-sdk'
import { FRA_KNOWLEDGE_BASE } from '@/lib/fra-knowledge'

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { messages, language = 'en' } = await req.json()

    const languageInstruction = language !== 'en'
      ? `IMPORTANT: Respond in ${language} language. Keep legal terms like Forest Rights Act, Gram Sabha, FRA in standard form.`
      : ''

    const stream = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      stream: true,
      messages: [
        {
          role: 'system',
          content: `${FRA_KNOWLEDGE_BASE}\n\n${languageInstruction}`,
        },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      ],
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? ''
          if (text) {
            controller.enqueue(encoder.encode(text))
          }
        }
        controller.close()
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (error) {
    console.error('Chat error:', error)
    return Response.json({ error: 'Failed to get response' }, { status: 500 })
  }
}