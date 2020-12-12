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

const getPostsHandler = async (req: Request, res: Response) => {
  validateUserHandler(req, res)

  const { userName } = req.params

  const schemaNameAsId = escapeId(schemaName)
  const postsTableNameAsId = escapeId(postsTableName)
  const likesTableNameAsId = escapeId(likesTableName)

  const skip = null
  const limit = null

  if (userName == null) {
    res.status(500)
    res.end('User not found')
    return
  }
  //NEED TO FIX: currentUsername and targetUsername
  const posts = await executeStatement(`
    SELECT (SELECT Count("likes1".*) FROM ${schemaNameAsId}.${likesTableNameAsId} "likes1"
    WHERE "likes1"."postId" = "posts"."postId") AS "likesCount",
    (SELECT Count("likes2".*) FROM ${schemaNameAsId}.${likesTableNameAsId} "likes2"
    WHERE "likes2"."username" = ${escapeStr(userName)}
    AND "likes2"."postId" = "posts"."postId") > 0 AS "isLiked",
    "posts".* FROM ${schemaNameAsId}.${postsTableNameAsId} "posts"
    ${userName != null ? `WHERE "posts"."username" = ${escapeStr(userName)} ` : ''}
    ORDER BY "posts"."createdAt" DESC
    ${skip != null && !isNaN(+skip) ? `OFFSET ${+skip} ` : ''}
    ${limit != null && !isNaN(+limit) ? `LIMIT ${+limit} ` : ''}
  `)

  return posts
}

export default getPostsHandler
