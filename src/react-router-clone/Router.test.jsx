import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { Router } from './Router'
import { getCurrentPath } from './util'
import { Link } from './Link'
import { Route } from './Route'

vi.mock('./util', () => ({
  getCurrentPath: vi.fn()
}))

describe('Router', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should render a component', () => {
    const app = render(<Router routes={[]} />)
    expect(app).toBeTruthy()
  })

  it('Should render 404 if no routes match', () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />)
    expect(screen.getByText('404')).toBeTruthy()
  })

  it('Should render a component if a route matches', () => {
    getCurrentPath.mockReturnValue('/about')
    const routes = [
      {
        path: '/',
        component: () => <h1>Home</h1>
      },
      {
        path: '/about',
        component: () => <h1>About</h1>
      }
    ]
    render(<Router routes={routes} />)
    expect(screen.getByText('About')).toBeTruthy()
  })

  // it('Should navigate using links', async () => {
  //   getCurrentPath.mockReturnValueOnce('/')

  //   render(
  //     <Router>
  //       <Route
  //         path='/' component={() => {
  //           return (
  //             <>
  //               <h1>Home</h1>
  //               <Link to='/about'>Go to About</Link>
  //             </>
  //           )
  //         }}
  //       />
  //       <Route path='/about' component={() => <h1>About</h1>} />
  //     </Router>
  //   )

  //   const button = screen.getByText(/Go to About/)
  //   fireEvent.click(button)

  //   const title = await screen.findByText('About')
  //   expect(title).toBeTruthy()
  // })
})
