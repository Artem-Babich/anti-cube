import jwt from 'jsonwebtoken'
import cookie from 'cookie'

import { Request, Response } from '../types'

const JWT_SECRET = process.env.JWT_SECRET

const validateUserHandler = (req: Request, res: Response) => {
  const { headers } = req
  const cookieHeader = headers['Set-Cookie']

  if (cookieHeader == null || cookieHeader === '') {
    res.status(500)
    res.end('Invalid read user, please login again')
    return
  }

  const { jwt: token } = cookie.parse(cookieHeader)

  if (token == null || JWT_SECRET == null) {
    res.status(500)
    res.end('Failed to read token')
    return
  }

  try {
    jwt.verify(token, JWT_SECRET)
  } catch (error) {
    res.status(500)
    res.end('Invalid jwt token')
  }
}

export default validateUserHandler
