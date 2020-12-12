import path from 'path'
import { Client } from 'pg'
import dotenv from 'dotenv'
import crypto from 'crypto'

dotenv.config({
  path: path.join(__dirname, '.env'),
})

const schemaName = 'main'
const usersTableName = 'users'
const postsTableName = 'posts'
const likesTableName = 'likes'

const escapeId = (str: string): string => `"${String(str).replace(/(["])/gi, '$1$1')}"`

const escapeStr = (str: string): string => `'${String(str).replace(/(['])/gi, '$1$1')}'`

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

const md5 = (text: string) => crypto.createHmac('md5', text).digest('hex')

void (async () => {
  const schemaNameAsId = escapeId(schemaName)
  const postsTableNameAsId = escapeId(postsTableName)
  const likesTableNameAsId = escapeId(likesTableName)
  const usersTableNameAsId = escapeId(usersTableName)

  await executeStatement(`DROP TABLE IF EXISTS ${schemaNameAsId}.${usersTableNameAsId}`)
  await executeStatement(`
    CREATE TABLE ${schemaNameAsId}.${usersTableNameAsId} (
      ${escapeId('username')} VARCHAR(50) UNIQUE NOT NULL,
      ${escapeId('passwordHash')} TEXT NOT NULL,
      ${escapeId('avatarImageUrl')} TEXT NOT NULL,
      PRIMARY KEY(${escapeId('username')})
    )
  `)

  await executeStatement(`DROP TABLE IF EXISTS ${schemaNameAsId}.${likesTableNameAsId}`)
  await executeStatement(`
    CREATE TABLE ${schemaNameAsId}.${likesTableNameAsId} (
      ${escapeId('likeId')} VARCHAR(50) NOT NULL,
      ${escapeId('postId')} VARCHAR(50) NOT NULL,
      ${escapeId('username')} VARCHAR(50) NOT NULL,
      PRIMARY KEY(${escapeId('likeId')})
    )
  `)

  await executeStatement(`DROP TABLE IF EXISTS ${schemaNameAsId}.${postsTableNameAsId}`)
  await executeStatement(`
    CREATE TABLE ${schemaNameAsId}.${postsTableNameAsId} (
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
      avatarImageUrl: `https://scontent-frt3-2.cdninstagram.com/v/t51.2885-19/s150x150/110319607_4362037790503741_6784432024238052244_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_ohc=mGtY1z-ygoQAX99auz4&tp=1&oh=0f8bc51f81092ab7aa0a7f74203b73e4&oe=5FFCFD32`,
    },
    {
      username: 'babich_artem',
      avatarImageUrl: `https://user-images.githubusercontent.com/5055654/101983365-bb929a80-3c8b-11eb-8df9-64c3f16cb87f.jpg`,
    },
    {
      username: 'mrcheater',
      avatarImageUrl: `https://scontent-frt3-2.cdninstagram.com/v/t51.2885-19/s150x150/45675925_523560148147503_5948854395897643008_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_ohc=sjSKwWsmf34AX8jiVz_&tp=1&oh=b440ffe2f7082ade850db99780872d95&oe=5FFDDAA0`,
    },
    {
      username: 'vladislav_forever',
      avatarImageUrl: `https://scontent-frt3-2.cdninstagram.com/v/t51.2885-19/s150x150/45675925_523560148147503_5948854395897643008_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_ohc=sjSKwWsmf34AX8jiVz_&tp=1&oh=b440ffe2f7082ade850db99780872d95&oe=5FFDDAA0`,
    },
  ].map((item) => ({ ...item, passwordHash: md5(item.username) }))
  const images = [
    `https://user-images.githubusercontent.com/5055654/101983495-5e4b1900-3c8c-11eb-8a84-44f824c586e3.jpeg`,
    `https://user-images.githubusercontent.com/5055654/101983497-5ee3af80-3c8c-11eb-9948-0189ef4e3efa.jpeg`,
    `https://user-images.githubusercontent.com/5055654/101983498-5f7c4600-3c8c-11eb-89fe-1366956183ba.jpeg`,
    `https://user-images.githubusercontent.com/5055654/101983499-6014dc80-3c8c-11eb-825c-e72b99f2dd1a.jpeg`,
    `https://user-images.githubusercontent.com/5055654/101983500-6014dc80-3c8c-11eb-91f9-7b24fc4ed8e0.jpeg`,
    `https://user-images.githubusercontent.com/5055654/101983501-60ad7300-3c8c-11eb-9ede-71d96bdcf02f.jpeg`,
    `https://user-images.githubusercontent.com/5055654/101983502-60ad7300-3c8c-11eb-8f9f-aa8648f0fde7.jpeg`,
  ]

  // Insert users
  for (const { username, passwordHash, avatarImageUrl } of users) {
    await executeStatement(`
      INSERT INTO ${schemaNameAsId}.${usersTableNameAsId} (
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
  const postsIds = []
  let postIndex = 0
  for (const { username } of users) {
    images.sort(() => (Math.random() > 0.5 ? 1 : -1))
    for (const imageUrl of images) {
      const postId = `${username}_post_${postIndex++}`
      postsIds.push(postId)
      await executeStatement(`
        INSERT INTO ${schemaNameAsId}.${postsTableNameAsId} (
          ${escapeId('postId')}, 
          ${escapeId('username')}, 
          ${escapeId('imageUrl')}, 
          ${escapeId('createdAt')}
        ) VALUES (
          ${escapeStr(postId)},
          ${escapeStr(username)},
          ${escapeStr(imageUrl)},
          ${Date.now()}
        )
      `)
    }
  }

  for (const postId of postsIds) {
    const likedUsers = users.map((user) => user.username)
    likedUsers.sort(() => (Math.random() > 0.5 ? 1 : -1))
    likedUsers.splice(0, Math.floor(Math.random() * likedUsers.length))
    for (const likedUser of likedUsers) {
      await executeStatement(`
        INSERT INTO ${schemaNameAsId}.${likesTableNameAsId} (
          ${escapeId('likeId')}, 
          ${escapeId('postId')}, 
          ${escapeId('username')}
        ) VALUES (
          ${escapeStr(`${postId}_like_${likedUser}`)},
          ${escapeStr(postId)},
          ${escapeStr(likedUser)}
        )
      `)
    }
  }

  const {
    currentUsername,
    targetUsername,
    skip,
    limit,
  }: { currentUsername: string; targetUsername?: string; skip?: number; limit?: number } = {
    currentUsername: 'mrcheater',
    targetUsername: undefined,
    skip: 0,
    limit: 1,
  }

  console.log(
    await executeStatement(`
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
  )
  console.log(
    await executeStatement(`
      SELECT *
      FROM ${escapeId(schemaName)}.${escapeId(usersTableName)}
    `)
  )
  console.log(
    await executeStatement(`
      SELECT *
      FROM ${escapeId(schemaName)}.${escapeId(postsTableName)}
    `)
  )
})()
