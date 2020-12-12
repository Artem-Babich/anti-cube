import { v4 as uuidV4 } from 'uuid'
import { Request, Response } from '../types'
import validateUserHandler from './validateUserHandler'
import {
  escapeId,
  escapeStr,
  executeStatement,
  likesTableName,
  postsTableName,
  schemaName,
} from '../postgres'

const getPostHandler = async (req: Request, res: Response) => {
  validateUserHandler(req, res)

  const { userName, postId } = req.params

  if (userName == null || postId == null) {
    res.status(500)
    res.end('UserName not found')
    return
  }

  const [post] = await executeStatement(`SELECT * FROM ${escapeId(schemaName)}.${escapeId(
    postsTableName
  )} WHERE ${escapeId(schemaName)}.${escapeId(postsTableName)}."username" = ${escapeStr(userName)}
  AND ${escapeId(schemaName)}.${escapeId(postsTableName)}."postId" = ${escapeStr(postId)}        
 `)

  if (post == null) {
    res.status(500)
    res.end(`Post with id=${postId} was not found`)
    return
  }
  const { imageUrl, createdAt } = post

  const postLikes = await executeStatement(`SELECT * FROM ${escapeId(schemaName)}.${escapeId(
    likesTableName
  )} WHERE ${escapeId(schemaName)}.${escapeId(likesTableName)}."postId" = ${escapeStr(
    postId
  )}        
 `)
  res.status(200)
  res.json({
    imageUrl,
    createdAt,
    likes: postLikes,
  })
}

export default getPostHandler
