// Data Mode(CSR)
// hash router: /#/path
// browser router: /path
//import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
// import { ErrorBoundary } from 'react-error-boundary'
import Default from '@/routes/layouts/Default'
import Home from '@/routes/pages/Home'
// import About from '@/routes/pages/About'
// import SignIn from '@/routes/pages/SignIn'
import Movies from '@/routes/pages/Movies'
import MovieDetails from '@/routes/pages/MovieDetails'
// import NotFound from '@/routes/pages/NotFound'
import { requireAuth } from '@/routes/loaders'
import { dynamic } from './dynamic'
import Loader from '@/components/Loader'


const DynamicOptions ={
  loading: <Loader />
}

// const Home = lazy(() => import('@/routes/pages/Home'))
//const About = lazy(() => import('@/routes/pages/About'))
//const SignIn = lazy(() => import('@/routes/pages/SignIn'))
const About = dynamic(() => import('@/routes/pages/About'), DynamicOptions)
const SignIn = dynamic(() => import('@/routes/pages/SignIn'), DynamicOptions)
// const Movies = lazy(() => import('@/routes/pages/Movies'))
// const MovieDetails = lazy(() => import('@/routes/pages/MovieDetails'))
const NotFound = dynamic(() => import('@/routes/pages/NotFound'), DynamicOptions)


const router = createBrowserRouter([
  {
    element: <Default />,
    children: [
      {
        path: '/', // http://localhost:5173/
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
        /*
        element: (
          //<ErrorBoundary fallback={<div>Error!</div>}>
          <ErrorBoundary fallbackRender={({error}) => {
            if (error instanceof Error) {
              return <div>Error: {error.message}</div>
            }          
            return <div>Error!</div>  
          }}>
            <Suspense fallback={<div>Loading...</div>}>
                  <About />
                </Suspense>
          </ErrorBoundary>
        )
        */
      },
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/movies',
        loader: requireAuth,
        element: <Movies />,        
        children: [
          {
            path: '/movies/:movieId',
            element: <MovieDetails />
          }
        ]
      }
    ]
  },
  {
        path: '*',
        element: <NotFound />    
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
