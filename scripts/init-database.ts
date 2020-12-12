import path from 'path'
import { Client } from 'pg'
import dotenv from 'dotenv'
import crypto from 'crypto'

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

const md5 = (text:string) => crypto.createHmac('md5', text).digest('hex')

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

  const users = [
    {
      username: 'lykoi18',
      avatarImageUrl: `https://scontent-frt3-2.cdninstagram.com/v/t51.2885-19/s150x150/110319607_4362037790503741_6784432024238052244_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_ohc=mGtY1z-ygoQAX99auz4&tp=1&oh=0f8bc51f81092ab7aa0a7f74203b73e4&oe=5FFCFD32`
    },
    {
      username: 'babich_artem',
      avatarImageUrl: `https://user-images.githubusercontent.com/5055654/101983365-bb929a80-3c8b-11eb-8df9-64c3f16cb87f.jpg`
    },
    {
      username: 'mrcheater',
      avatarImageUrl: `https://scontent-frt3-2.cdninstagram.com/v/t51.2885-19/s150x150/45675925_523560148147503_5948854395897643008_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_ohc=sjSKwWsmf34AX8jiVz_&tp=1&oh=b440ffe2f7082ade850db99780872d95&oe=5FFDDAA0`
    }
  ].map(
    item => ({ ...item, passwordHash: md5(item.username) })
  )
  const images = [
    `https://user-images.githubusercontent.com/5055654/101983495-5e4b1900-3c8c-11eb-8a84-44f824c586e3.jpeg`,
    `https://user-images.githubusercontent.com/5055654/101983497-5ee3af80-3c8c-11eb-9948-0189ef4e3efa.jpeg`,
    `https://user-images.githubusercontent.com/5055654/101983498-5f7c4600-3c8c-11eb-89fe-1366956183ba.jpeg`,
    `https://user-images.githubusercontent.com/5055654/101983499-6014dc80-3c8c-11eb-825c-e72b99f2dd1a.jpeg`,
    `https://user-images.githubusercontent.com/5055654/101983500-6014dc80-3c8c-11eb-91f9-7b24fc4ed8e0.jpeg`,
    `https://user-images.githubusercontent.com/5055654/101983501-60ad7300-3c8c-11eb-9ede-71d96bdcf02f.jpeg`,
    `https://user-images.githubusercontent.com/5055654/101983502-60ad7300-3c8c-11eb-8f9f-aa8648f0fde7.jpeg`
  ]

  // Insert users
  for(const { username, passwordHash, avatarImageUrl } of users) {
    await executeStatement(`
      INSERT INTO ${escapeId(schemaName)}.${escapeId(usersTableName)} (
        ${escapeId('username')}, 
        ${escapeId('passwordHash')}, 
        ${escapeId('avatarImageUrl')}
      ) VALUES (
        ${escapeStr(username)},
        ${escapeStr(passwordHash)},
        ${escapeStr(avatarImageUrl)}
      )
    `)
  }

  // Insert posts
  let postIndex = 0
  for(const { username } of users) {
    images.sort(()=>Math.random()>0.5 ? 1 : -1)
    for(const imageUrl of images) {
      await executeStatement(`
        INSERT INTO ${escapeId(schemaName)}.${escapeId(postsTableName)} (
          ${escapeId('postId')}, 
          ${escapeId('username')}, 
          ${escapeId('imageUrl')}, 
          ${escapeId('createdAt')}
        ) VALUES (
          ${escapeStr(`${username}_post_${postIndex++}`)},
          ${escapeStr(username)},
          ${escapeStr(imageUrl)},
          ${Date.now()}
        )
      `)
    }
  }

  console.log(
    await executeStatement(`
      SELECT *
      FROM ${escapeId(schemaName)}.${escapeId(usersTableName)}
    `)
  )
})()
