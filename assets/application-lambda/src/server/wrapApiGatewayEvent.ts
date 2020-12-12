import cookie from 'cookie'

import { HttpMethod, Request, Response } from './types'

const wrapApiGatewayEvent = (event: {
  queryStringParameters: Record<string, string>
  path: string
  httpMethod: HttpMethod
  body: string
}): { req: Request; res: Response } => {
  const req: Request = {
    query: event.queryStringParameters,
    url: event.path,
    method: event.httpMethod,
    body: {} as any,
    params: {},
  }
  try {
    req.body = JSON.parse(Buffer.from(event.body, 'base64').toString('utf8'))
  } catch {}

  const res: Response = {
    INTERNAL: {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      isBase64Encoded: false,
      body: '',
    },
    end(text = '') {
      res.INTERNAL.body = text
      return res
    },
    json(json = {}) {
      res.INTERNAL.headers['Content-Type'] = 'application/json'
      res.INTERNAL.body = JSON.stringify(json)
      return res
    },
    status(code) {
      res.INTERNAL.statusCode = code
      return res
    },
    redirect(path, code) {
      res.INTERNAL.headers.Location = path
      res.INTERNAL.statusCode = code != null ? code : 302
      return res
    },
    setHeader(key, value) {
      res.INTERNAL.headers[key] = value
      return res
    },
    setCookie(key, value) {
      res.INTERNAL.headers['Set-Cookie'] = cookie.serialize(key, value)
      return res
    },
    enableBase64Encoded() {
      res.INTERNAL.isBase64Encoded = true
      return res
    },
    disableBase64Encoded() {
      res.INTERNAL.isBase64Encoded = false
      return res
    },
  }

  return { req, res }
}

export default wrapApiGatewayEvent
