import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import getRoutes from '../../common/getRoutes'
import Routes from '../../common/Routes'
import createStore from '../../common/redux/createStore'

import { Request, Response } from '../types'

const markupHandler = (req: Request, res: Response) => {
  const routes = getRoutes()
  const store = createStore()

  const routerContext: { url?: string } = {}

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={routerContext}>
        <Routes routes={routes} />
      </StaticRouter>
    </Provider>
  )

  if (routerContext.url) {
    res.setHeader('Location', routerContext.url)
    res.end()
  } else {
    res.end(`
        <!doctype html>
        <html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <title>SberGram / СберФото</title>
            <script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
            <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
            <script crossorigin src="https://unpkg.com/react-router-dom@5.2.0/umd/react-router-dom.min.js"></script>
          </head>
          <body>
            <div id="app-container">${html}</div>
            <script src="/client.js"></script>
          </body>
        </html>
      `)
  }
}

export default markupHandler
