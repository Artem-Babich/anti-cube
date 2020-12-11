import * as fs from 'fs'
import * as path from 'path'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import getRoutes from '../common/getRoutes'
import Routes from '../common/Routes'
import createStore from '../common/redux/createStore'

export const handler = async (event: any, context: any) => {
  const req = {
    query: event.queryStringParameters,
    url: event.path,
    method: event.httpMethod,
    body: {} as any,
  }
  try {
    req.body = JSON.parse(Buffer.from(event.body, 'base64').toString('utf8'))
  } catch {}

  const output = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    } as Record<string, string>,
    isBase64Encoded: false,
    body: '',
  }

  const res = {
    end(text: string = '') {
      output.body = text
      return res
    },
    status(code: number) {
      output.statusCode = code
      return res
    },
    setHeader(key: string, value: string) {
      output.headers[key] = value
      return res
    },
  }

  if (req.url === '/client.js') {
    res.setHeader('Content-Type', 'text/javascript')
    res.end(fs.readFileSync(path.join(__dirname, '..', '..', 'dist', 'client.js')).toString('utf8'))
  } else if (req.url === '/client.js.LICENSE.txt') {
    res.setHeader('Content-Type', 'text/plain')
    res.end(
      fs
        .readFileSync(path.join(__dirname, '..', '..', 'dist', 'client.js.LICENSE.txt'))
        .toString('utf8')
    )
  } else {
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

    if (context.url) {
      res.setHeader('Location', context.url)
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

  return output
}
