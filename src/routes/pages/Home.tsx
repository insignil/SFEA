import axios from 'axios'
import { useQuery } from '@tanstack/react-query'


export default function Home() {
  useQuery(
    {
      queryKey: ['test'],
      queryFn: async () =>{
        const { data } = await axios.get('/api/test')
        return data
      }
    }
  )
  return (
    <>
      <h1>Home Page!</h1>
    </>
  )
}
