import * as path from 'path'
import * as fs from 'fs'

import { Request, Response } from '../types'

const createStaticFileHandler = (fileName: string, contentType: string) => (
  req: Request,
  res: Response
) => {
  res.setHeader('Content-Type', contentType)
  res.enableBase64Encoded()
  res.end(
    fs.readFileSync(path.join(__dirname, '..', '..', '..', 'static', fileName)).toString('base64')
  )
}

export default createStaticFileHandler
