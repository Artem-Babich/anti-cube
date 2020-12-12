import {
  executeStatement,
  schemaName,
  postsTableName,
  likesTableName,
  usersTableName,
  escapeId,
  escapeStr,
} from './postgres'

const togglePostLike = async (currentUsername: string, postId: string) => {
  const schemaNameAsId = escapeId(schemaName)
  const postsTableNameAsId = escapeId(postsTableName)
  const likesTableNameAsId = escapeId(likesTableName)
  const usersTableNameAsId = escapeId(usersTableName)

  await executeStatement(`
      WITH "CTE1" AS (
        SELECT EXISTS(SELECT * FROM ${schemaNameAsId}.${postsTableNameAsId}
        WHERE "postId" = ${escapeStr(postId)}) AND
        EXISTS(SELECT * FROM ${schemaNameAsId}.${usersTableNameAsId}
        WHERE "username" = ${escapeStr(currentUsername)}) AS "ok"
      ), "CTE2" AS (
        DELETE FROM ${schemaNameAsId}.${likesTableNameAsId}
        WHERE "username" = ${escapeStr(currentUsername)}
        AND "postId" = ${escapeStr(postId)}
        RETURNING *
      )
      INSERT INTO ${schemaNameAsId}.${likesTableNameAsId}("likeId", "username", "postId")
      SELECT ${escapeStr(currentUsername)} || ${escapeStr('_like_')} || ${escapeStr(
    postId
  )} AS "likeId",
      ${escapeStr(currentUsername)} AS "username",
      ${escapeStr(postId)} AS "postId"
      WHERE NOT(NOT((SELECT "ok" FROM "CTE1" LIMIT 1)))
      AND (SELECT Count(*) FROM "CTE2") = 0
    `)
}

export default togglePostLike
