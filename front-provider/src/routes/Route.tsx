import { RouteProps, Route as ReactDomRoute, Redirect } from 'react-router-dom'

import { useAuth } from '../hooks/AuthContext'

interface IRouteProps extends RouteProps {
  isPrivate?: boolean
  component: React.ComponentType
}

export function Route({
  isPrivate = false,
  component: Component,
  ...rest
}: IRouteProps): JSX.Element {
  const { isAuthenticated } = useAuth()

  return (
    <ReactDomRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === isAuthenticated ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : 'dashboard',
              state: {
                from: location
              }
            }}
          />
        )
      }}
    />
  )
}
