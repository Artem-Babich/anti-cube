import { Request, Response } from '../types'

const loginHandler = (req: Request, res: Response) => {
  res.status(500)
  res.end()
}

export default loginHandler
