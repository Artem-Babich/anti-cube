import { Request, Response } from '../types'
import validateUserHandler from './validateUserHandler'

const exploreHandler = (req: Request, res: Response) => {
  validateUserHandler(req, res)
  res.status(500)
  res.end()
}

export default exploreHandler
