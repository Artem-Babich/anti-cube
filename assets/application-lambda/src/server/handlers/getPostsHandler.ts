import { Request, Response } from '../types'

const getPostsHandler = (req: Request, res: Response) => {
  res.status(500)
  res.end()
}

export default getPostsHandler
