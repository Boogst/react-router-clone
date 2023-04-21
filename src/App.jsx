import { Router } from './react-router-clone/Router'
import { Route } from './react-router-clone/Route'
import { Suspense, lazy } from 'react'

const lazyHome = lazy(() => import('./pages/Home'))
const lazyAbout = lazy(() => import('./pages/About'))

function App () {
  return (
    <main>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Router>
          <Route path='/' component={lazyHome} />
          <Route path='/about' component={lazyAbout} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
