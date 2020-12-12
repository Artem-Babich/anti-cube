import path from 'path'
import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config({
  path: path.join(__dirname, '.env')
})

const escapeId = (str: string):string => `"${String(str).replace(/(["])/gi, '$1$1')}"`

const escapeStr = (str: string):string => `'${String(str).replace(/(['])/gi, '$1$1')}'`

const executeStatement = async <T extends Record<string, any>>(sql: string): Promise<Array<T>> => {
  const client = new Client()
  await client.connect()
  try {
    const res = await client.query('SELECT 0')
    return res.rows
  } finally {
    await client.end()
  }
}

void (async () => {
  console.log(
    await executeStatement('SELECT 0')
  )
})()
