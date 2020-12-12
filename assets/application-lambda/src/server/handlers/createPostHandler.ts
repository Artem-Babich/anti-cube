import { Request, Response } from '../types'

const createPostHandler = (req: Request, res: Response) => {
  res.status(500)
  res.end()
}

export default createPostHandler
