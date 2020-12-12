import crypto from 'crypto'
import jwt from 'jsonwebtoken'

import { Request, Response } from '../types'
import { escapeId, escapeStr, executeStatement, schemaName, usersTableName } from '../postgres'

const JWT_SECRET = process.env.JWT_SECRET

const loginHandler = async (req: Request, res: Response) => {
  const { login, password } = req.body

  const [foundUser] = await executeStatement(`
    SELECT * FROM ${escapeId(schemaName)}.${escapeId(usersTableName)}
    WHERE ${escapeId(schemaName)}.${escapeId(usersTableName)}."username" = ${escapeStr(login)}
  `)

  if (foundUser == null) {
    res.status(500)
    res.end(`User ${login} not found`)
    return
  }

  const { username, passwordHash: foundUserPasswordHash } = foundUser

  const passwordHash = crypto.createHmac('md5', password).digest('hex')

  if (passwordHash !== foundUserPasswordHash) {
    res.status(500)
    res.end(`Wrong password`)
    return
  }

  if (JWT_SECRET == null) {
    res.status(500)
    res.end(`Secret not found`)
    return
  }

  const token = jwt.sign({ userName: username, passwordHash }, JWT_SECRET)

  res.status(200)
  res.setCookie('jwt', token)
  res.json({ token })
}

export default loginHandler
