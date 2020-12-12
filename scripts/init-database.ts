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
      ${escapeId('username')} VARCHAR(50) UNIQUE NOT NULL,
      ${escapeId('passwordHash')} TEXT NOT NULL,
      ${escapeId('avatarImageUrl')} TEXT NOT NULL,
      PRIMARY KEY(${escapeId('username')})
    )
  `)

  await executeStatement(`DROP TABLE IF EXISTS ${escapeId(schemaName)}.${escapeId(likesTableName)}`)
  await executeStatement(`
    CREATE TABLE ${escapeId(schemaName)}.${escapeId(likesTableName)} (
      ${escapeId('postId')} VARCHAR(50) NOT NULL,
      ${escapeId('username')} VARCHAR(50) NOT NULL,
      PRIMARY KEY(${escapeId('postId')})
    )
  `)

  await executeStatement(`DROP TABLE IF EXISTS ${escapeId(schemaName)}.${escapeId(postsTableName)}`)
  await executeStatement(`
    CREATE TABLE ${escapeId(schemaName)}.${escapeId(postsTableName)} (
      ${escapeId('postId')} VARCHAR(50) NOT NULL,
      ${escapeId('username')} VARCHAR(50) NOT NULL,
      ${escapeId('imageUrl')} TEXT NOT NULL,
      ${escapeId('createdAt')} BIGINT NOT NULL,
      PRIMARY KEY(${escapeId('postId')})
    )
  `)

  // Insert users
  await executeStatement(`
    INSERT INTO ${escapeId(schemaName)}.${escapeId(usersTableName)} (
      ${escapeId('username')}, 
      ${escapeId('passwordHash')}, 
      ${escapeId('avatarImageUrl')}
    ) VALUES (
      ${escapeStr('lykoi18')},
      ${escapeStr('hash(lykoi18)')},
      ${escapeStr(`https://scontent-frt3-2.cdninstagram.com/v/t51.2885-19/s150x150/110319607_4362037790503741_6784432024238052244_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_ohc=mGtY1z-ygoQAX99auz4&tp=1&oh=0f8bc51f81092ab7aa0a7f74203b73e4&oe=5FFCFD32`)}
    )
  `)

  console.log(
    await executeStatement(`
      SELECT *
      FROM ${escapeId(schemaName)}.${escapeId(usersTableName)}
    `)
  )
})()
