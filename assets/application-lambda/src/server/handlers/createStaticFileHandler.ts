import * as path from 'path'
import * as fs from 'fs'

import { Request, Response } from '../types'

const createStaticFileHandler = (fileName: string, contentType: string, noCache?: boolean) => (
  req: Request,
  res: Response
) => {
  res.setHeader('Content-Type', contentType)

  if (noCache) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
  }

  res.enableBase64Encoded()
  res.end(
    fs.readFileSync(path.join(__dirname, '..', '..', '..', 'static', fileName)).toString('base64')
  )
}

export default createStaticFileHandler
