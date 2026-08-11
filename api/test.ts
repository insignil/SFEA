export async function GET() {
  return new Response(
        JSON.stringify({
        name: 'HH',
        age: 22
    })
  )
}