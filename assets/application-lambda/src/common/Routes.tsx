import * as React from 'react'
import { Route, Redirect, Switch } from 'react-router'

const Routes = (props: { path?: string, component?: any, routes?: any, exact?: boolean, redirectTo?:string }) => {
  const { path, component: Component, routes, exact, redirectTo } = props

  if (redirectTo != null) {
    return <Redirect from={path} to={redirectTo} />
  }

  return routes ? (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        const content = (
          <Switch>
            {routes.map((route: any, index: number) => (
              <Routes key={index} {...route} />
            ))}
          </Switch>
        )
        return Component ? <Component {...props}>{content}</Component> : content
      }}
    />
  ) : (
    <Route path={path} exact={exact} component={Component} />
  )
}

export default Routes
