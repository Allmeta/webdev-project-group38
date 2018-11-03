import { Pool } from 'pg'
import fs from 'fs'

const config = JSON.parse(fs.readFileSync('db_config.json', 'utf8'))

const pool = new Pool(config)

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

export { pool }