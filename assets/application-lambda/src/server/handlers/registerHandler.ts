import { Request, Response } from '../types'

const registerHandler = (req: Request, res: Response) => {
  res.status(500)
  res.end()
}

export default registerHandler
