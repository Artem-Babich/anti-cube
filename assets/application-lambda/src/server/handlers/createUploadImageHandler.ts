import * as https from 'https'
import * as crypto from 'crypto'
import { v4 as uuidV4 } from 'uuid'

import { Context, Request, Response } from '../types'

const createUploadImageHandler = (context: Context) => async (req: Request, res: Response) => {
  const { authToken } = context
  const { userId } = req.params

  const uploadId = uuidV4()

  const body = Buffer.from(
    JSON.stringify({
      auth: {
        identity: {
          methods: ['token'],
          token: {
            id: authToken,
            'duration-seconds': '900',
          },
        },
      },
    }),
    'utf8'
  )

  const options = {
    hostname: 'iam.ru-moscow-1.hc.sbercloud.ru',
    port: 443,
    path: '/v3.0/OS-CREDENTIAL/securitytokens',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf8',
      'Content-Length': body.length,
    },
  }

  const credentialBuffer: Buffer = await new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.on('data', (data) => {
        resolve(data)
      })
      res.on('error', (error) => {
        reject(error)
      })
    })

    req.write(body)
    req.end()
  })
  const {
    credential,
  }: {
    credential: { securitytoken: string; secret: string }
  } = JSON.parse(credentialBuffer.toString('utf8'))
  const { securitytoken, secret } = credential

  const stringToSign = Buffer.from(
    JSON.stringify({
      expiration: '2020-12-31T12:00:00.000Z',
      conditions: [
        { 'x-obs-acl': 'public-read' },
        { 'x-obs-security-token': securitytoken },
        { bucket: 'anti-cube-images' },
        ['starts-with', '$key', `${userId}/`],
      ],
    }),
    'utf8'
  ).toString('base64')

  const hmac = crypto.createHmac('sha1', secret)
  hmac.update(stringToSign)
  const signature = hmac.digest('base64')

  res.json({
    uploadId,
    signature,
  })
}

export default createUploadImageHandler
