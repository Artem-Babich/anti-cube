import crypto from 'crypto'
import jwt from 'jsonwebtoken'

import { Request, Response } from '../types'
import { escapeId, escapeStr, executeStatement, schemaName, usersTableName } from '../postgres'

const JWT_SECRET = process.env.JWT_SECRET

const registerHandler = async (req: Request, res: Response) => {
  const { login, password, avatarUrl } = req.body

  const [foundUser] = await executeStatement(`
    SELECT * FROM ${escapeId(schemaName)}.${escapeId(usersTableName)}
    WHERE ${escapeId(schemaName)}.${escapeId(usersTableName)}."username" = ${escapeStr(login)}
  `)

  if (foundUser != null) {
    res.status(500)
    res.end(`User ${login} already exist`)
    return
  }

  const passwordHash = crypto.createHmac('md5', password).digest('hex')

  await executeStatement(`
    INSERT INTO ${escapeId(schemaName)}.${escapeId(usersTableName)} (
      ${escapeId('username')}, 
      ${escapeId('passwordHash')}, 
      ${escapeId('avatarImageUrl')}
    ) VALUES (
      ${escapeStr(login)},
      ${escapeStr(passwordHash)},
      ${escapeStr(avatarUrl)}
    )
  `)

  if (JWT_SECRET == null) {
    res.status(500)
    res.end(`Secret not found`)
    return
  }

  const token = jwt.sign({ userName: login, passwordHash }, JWT_SECRET)

  res.status(200)
  res.setCookie('jwt', token)
  res.json({ token })
}

export default registerHandler
