import { Request, Response } from '../types'

const exploreHandler = (req: Request, res: Response) => {
  res.status(500)
  res.end()
}

export default exploreHandler
