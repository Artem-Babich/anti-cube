export type Context = {
  authToken: string
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS'

export type Response = {
  INTERNAL: {
    statusCode: number
    headers: Record<string, string>
    isBase64Encoded: boolean
    body: string
  }
  end: (text?: string) => Response
  json: (json: Record<string, any>) => Response
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
