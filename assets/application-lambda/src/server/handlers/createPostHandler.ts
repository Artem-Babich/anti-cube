import { v4 as uuidV4 } from 'uuid'
import { Request, Response } from '../types'
import validateUserHandler from './validateUserHandler'
import { executeStatement, schemaName, postsTableName, escapeId, escapeStr } from '../postgres'

const createPostHandler = async (req: Request, res: Response) => {
  validateUserHandler(req, res)
  const { imageUrl } = req.body
  const { userName } = req.params
  if (userName == null) {
    res.status(500)
    res.end('UserName not found')
    return
  }

  await executeStatement(`INSERT INTO ${escapeId(schemaName)}.${escapeId(postsTableName)} (
    ${escapeId('postId')}, 
    ${escapeId('username')}, 
    ${escapeId('imageUrl')}, 
    ${escapeId('createdAt')}
  ) VALUES (
    ${escapeStr(uuidV4())},
    ${escapeStr(userName)},
    ${escapeStr(imageUrl)},
    ${Date.now()}) 
   `)
}

export default createPostHandler
