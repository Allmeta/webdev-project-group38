import { Pool } from 'pg'
import fs from 'fs'

const config = JSON.parse(fs.readFileSync('db_config.json', 'utf8'))

const pool = new Pool(config)

export { pool }
