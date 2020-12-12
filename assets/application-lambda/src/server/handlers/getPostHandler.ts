import { Request, Response } from '../types'

const getPostHandler = (req: Request, res: Response) => {
  res.status(500)
  res.end()
}

export default getPostHandler
