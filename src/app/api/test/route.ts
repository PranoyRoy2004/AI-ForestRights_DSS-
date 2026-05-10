export async function GET() {
  return Response.json({ status: 'ok', key: process.env.ANTHROPIC_API_KEY ? 'key found' : 'NO KEY' })
}
