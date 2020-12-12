import { Request, Response } from '../types'

const failHandler = (req: Request, res: Response) => {
  res.status(500)
  res.end()
}

export default failHandler
