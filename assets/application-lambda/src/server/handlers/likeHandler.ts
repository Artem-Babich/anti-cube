import { Request, Response } from '../types'
import validateUserHandler from './validateUserHandler'
import {
  escapeId,
  escapeStr,
  executeStatement,
  likesTableName,
  postsTableName,
  schemaName,
  usersTableName,
} from '../postgres'

const likeHandler = async (req: Request, res: Response) => {
  validateUserHandler(req, res)

  const { userName, postId } = req.params

  const schemaNameAsId = escapeId(schemaName)
  const postsTableNameAsId = escapeId(postsTableName)
  const likesTableNameAsId = escapeId(likesTableName)
  const usersTableNameAsId = escapeId(usersTableName)

  if (userName == null || postId == null) {
    res.status(500)
    res.end(`User or post with id=${postId} not found`)
    return
  }

  await executeStatement(`
      WITH "CTE1" AS (
        SELECT EXISTS(SELECT * FROM ${schemaNameAsId}.${postsTableNameAsId}
        WHERE "postId" = ${escapeStr(postId)}) AND
        EXISTS(SELECT * FROM ${schemaNameAsId}.${usersTableNameAsId}
        WHERE "username" = ${escapeStr(userName)}) AS "ok"
      ), "CTE2" AS (
        DELETE FROM ${schemaNameAsId}.${likesTableNameAsId}
        WHERE "username" = ${escapeStr(userName)}
        AND "postId" = ${escapeStr(postId)}
        RETURNING *
      )
      INSERT INTO ${schemaNameAsId}.${likesTableNameAsId}("likeId", "username", "postId")
      SELECT ${escapeStr(userName)} || ${escapeStr('_like_')} || ${escapeStr(postId)} AS "likeId",
      ${escapeStr(userName)} AS "username",
      ${escapeStr(postId)} AS "postId"
      WHERE NOT(NOT((SELECT "ok" FROM "CTE1" LIMIT 1)))
      AND (SELECT Count(*) FROM "CTE2") = 0
    `)
}

export default likeHandler
