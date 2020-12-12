export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS'

export type Response = {
  INTERNAL: {
    statusCode: number
    headers: Record<string, string>
    isBase64Encoded: boolean
    body: string
  }
  end: (text?: string) => Response
  status: (code: number) => Response
  redirect: (path: string, code?: number) => Response
  setHeader: (key: string, value: string) => Response
  enableBase64Encoded: () => Response
  disableBase64Encoded: () => Response
}

export type Request = {
  query: Record<string, string>
  url: string
  method: HttpMethod
  body: Record<string, any>
  params: Record<string, string>
}

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
