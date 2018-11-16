/**
 * This files handles the database connections.
 * Since we are making multiple requests to the database,
 * we have a connection pool which we retrieve connections from.
 */
import { Pool } from 'pg'
import fs from 'fs'

const config = JSON.parse(fs.readFileSync('db_config.json', 'utf8'))

const pool = new Pool(config)

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

export { pool }
