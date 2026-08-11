import axios from 'axios'

interface RqeuestBody {
  title?: string
  id?: string
}

export async function POST(request: Request) {
  const { title, id }= (await request.json()) as RqeuestBody 
  const url = id
   ?  `https://omdbapi.com?apikey=${process.env.OMDB_API_KEY}&i=${id}`
   :  `https://omdbapi.com?apikey=${process.env.OMDB_API_KEY}&s=${title}`

  const { data } = await axios.get(url)
  return Response.json(data)
}