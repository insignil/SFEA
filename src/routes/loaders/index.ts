import api from '@/lib/api'
import { redirect } from 'react-router'


async function verifyToken() {  
  // 또는 API로 Token 유효성을 확인합니다.
  try {
    await api.post('/auth/me')
	  return true
  } catch (error) {
      console.error(error)
	  return false
  }
}



export async function requireAuth({ request }: { request: Request }) {
  /*
  // 인증 여부 확인!
  const token = localStorage.getItem(ACCESS_TOKEN_NAME)
  if (token) return null
  // fail
  return redirect('/signin')    
  */

  const isVerifed = await verifyToken()
  if (isVerifed) return null
  
  const url = new URL(request.url)
  url.pathname  // movies
  url.search // ?a=1&b=2

  //return redirect('/signin')    
  return redirect('/signin?redirectTo=${encodeURIComponent(url.pathname + url.search)}')
}