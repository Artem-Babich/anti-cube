exports.handler = async (event: any, context: any) => {
  const req = {
    query: event.queryStringParameters,
    path: event.path,
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
        },
      isBase64Encoded: false,
      body: ''
    }

  const res =  {
    end(text: string) {
      output.body = text
      return res
    },
    status(code:number) {
      output.statusCode = code
      return res
    }
  }

  res.end('Hello world')

  return output;
}
