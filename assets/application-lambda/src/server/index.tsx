import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from "react-router-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import getRoutes from '../common/getRoutes'
import Routes from '../common/Routes'

export const handler = async (event: any, context: any) => {
  const req = {
    query: event.queryStringParameters,
    url: event.path,
    method: event.httpMethod,
    body: {} as any
  }
  try {
    req.body = JSON.parse(Buffer.from(event.body, 'base64').toString('utf8'))
  } catch {}

  const output =
    {
      statusCode: 200,
      headers:
        {
          'Content-Type': 'text/html'
        } as Record<string, string>,
      isBase64Encoded: false,
      body: ''
    }

  const res =  {
    end(text: string = '') {
      output.body = text
      return res
    },
    status(code:number) {
      output.statusCode = code
      return res
    },
    setHeader(key:string, value: string) {
      output.headers[key] = value
      return res
    }
  }


  const routes = getRoutes()
  const store = createStore(()=>null)

  const routerContext: {url?: string} = {};

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={routerContext}>
        <Routes routes={routes} />
      </StaticRouter>
    </Provider>,
  );

  if (context.url) {
    res.setHeader('Location', context.url);
    res.end();
  } else {
    res.end(`
      <!doctype html>
      <div id="app-container">${html}</div>
    `);
  }

  return output;
}
