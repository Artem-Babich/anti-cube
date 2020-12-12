import { Request, Response } from '../wrapApiGatewayEvent'

const failHandler = (req: Request, res: Response) => {
  res.status(500)
  res.end()
}

export default failHandler
