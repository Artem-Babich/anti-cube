import {
  executeStatement,
  schemaName,
  postsTableName,
  likesTableName,
  escapeId,
  escapeStr,
} from './postgres'

const getPosts = async (
  currentUsername: string,
  targetUsername?: string,
  skip?: number,
  limit?: number
) => {
  const schemaNameAsId = escapeId(schemaName)
  const postsTableNameAsId = escapeId(postsTableName)
  const likesTableNameAsId = escapeId(likesTableName)

  const posts = await executeStatement(`
    SELECT (SELECT Count("likes1".*) FROM ${schemaNameAsId}.${likesTableNameAsId} "likes1"
    WHERE "likes1"."postId" = "posts"."postId") AS "likesCount",
    (SELECT Count("likes2".*) FROM ${schemaNameAsId}.${likesTableNameAsId} "likes2"
    WHERE "likes2"."username" = ${escapeStr(currentUsername)}
    AND "likes2"."postId" = "posts"."postId") > 0 AS "isLiked",
    "posts".* FROM ${schemaNameAsId}.${postsTableNameAsId} "posts"
    ${targetUsername != null ? `WHERE "posts"."username" = ${escapeStr(currentUsername)} ` : ''}
    ORDER BY "posts"."createdAt" DESC
    ${skip != null && !isNaN(+skip) ? `OFFSET ${+skip} ` : ''}
    ${limit != null && !isNaN(+limit) ? `LIMIT ${+limit} ` : ''}
  `)

  return posts
}

export default getPosts
