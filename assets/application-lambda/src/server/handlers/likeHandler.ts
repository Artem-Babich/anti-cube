import { Request, Response } from '../types'

const likeHandler = (req: Request, res: Response) => {
  res.status(500)
  res.end()
}

export default likeHandler
