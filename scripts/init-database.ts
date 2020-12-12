import path from 'path'
import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config({
  path: path.join(__dirname, '.env')
})

const schemaName = 'main'
const usersTableName = 'users'
const postsTableName = 'posts'
const likesTableName = 'likes'

const escapeId = (str: string):string => `"${String(str).replace(/(["])/gi, '$1$1')}"`

const escapeStr = (str: string):string => `'${String(str).replace(/(['])/gi, '$1$1')}'`

const executeStatement = async <T extends Record<string, any>>(sql: string): Promise<Array<T>> => {
  const client = new Client()
  await client.connect()
  try {
    const res = await client.query(sql)
    return res.rows
  } finally {
    await client.end()
  }
}

void (async () => {
  await executeStatement(`DROP TABLE IF EXISTS ${escapeId(schemaName)}.${escapeId(usersTableName)}`)
  await executeStatement(`
    CREATE TABLE ${escapeId(schemaName)}.${escapeId(usersTableName)} (
      ${escapeId('userId')} VARCHAR(50) NOT NULL,
      ${escapeId('username')} VARCHAR(50) UNIQUE NOT NULL,
      ${escapeId('password')} VARCHAR(50) NOT NULL,
      PRIMARY KEY(${escapeId('userId')})
    )
  `)

  await executeStatement(`DROP TABLE IF EXISTS ${escapeId(schemaName)}.${escapeId(likesTableName)}`)
  await executeStatement(`
    CREATE TABLE ${escapeId(schemaName)}.${escapeId(likesTableName)} (
      ${escapeId('postId')} VARCHAR(50) NOT NULL,
      ${escapeId('userId')} VARCHAR(50) NOT NULL,
      PRIMARY KEY(${escapeId('postId')})
    )
  `)

  await executeStatement(`DROP TABLE IF EXISTS ${escapeId(schemaName)}.${escapeId(postsTableName)}`)
  await executeStatement(`
    CREATE TABLE ${escapeId(schemaName)}.${escapeId(postsTableName)} (
      ${escapeId('postId')} VARCHAR(50) NOT NULL,
      ${escapeId('userId')} VARCHAR(50) NOT NULL,
      ${escapeId('imageUrl')} VARCHAR(50) NOT NULL,
      ${escapeId('createdAt')} BIGINT NOT NULL,
      PRIMARY KEY(${escapeId('postId')})
    )
  `)
  
  console.log(
    await executeStatement(`
      SELECT *
      FROM ${escapeId(schemaName)}.${escapeId(usersTableName)}
    `)
  )
})()
