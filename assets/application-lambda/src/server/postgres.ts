import { Client } from 'pg'

export const escapeId = (str: string): string => `"${String(str).replace(/(["])/gi, '$1$1')}"`

export const escapeStr = (str: string): string => `'${String(str).replace(/(['])/gi, '$1$1')}'`

export const executeStatement = async <T extends Record<string, any>>(
  sql: string
): Promise<Array<T>> => {
  const client = new Client()
  await client.connect()
  try {
    const res = await client.query(sql)
    return res.rows
  } finally {
    await client.end()
  }
}

export const schemaName = 'main'
export const usersTableName = 'users'
export const postsTableName = 'posts'
export const likesTableName = 'likes'
