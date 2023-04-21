import { Children, useEffect, useState } from 'react'
import { EVENTS } from './consts'
import { match } from 'path-to-regexp'
import { getCurrentPath } from './util'

export function Router ({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath())

  useEffect(() => {
    function onLocationChange () {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener(EVENTS.PUSH_STATE, onLocationChange)
    window.addEventListener(EVENTS.POP_STATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSH_STATE, onLocationChange)
      window.removeEventListener(EVENTS.POP_STATE, onLocationChange)
    }
  }, [])

  let routeParams = {}

  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'

    return isRoute ? props : null
  })

  const allRoutes = routes.concat(routesFromChildren).filter(Boolean)

  const Page = allRoutes.find(({ path }) => {
    if (path === currentPath) return true

    const matchPath = match(path, { decode: decodeURIComponent })
    const matchResult = matchPath(currentPath)

    if (!matchResult) return false

    routeParams = matchResult.params
    return true
  })?.component

  return Page ? <Page routeParams={routeParams} /> : <DefaultComponent routeParams={routeParams} />
}
