import express from 'express'
import { pool } from '../dbConnect'

const router = express.Router()

router.get('/movies', (req, res) => {
  let query
  if (req.query.search) {
    query = {
      text: 'SELECT * FROM movie WHERE title = $1',
      values: [req.query.search.toString()]
    }
  } else {
    query = 'SELECT * FROM movie'
  }
  pool.query(query)
    .then((movies) => res.json(movies.rows))
    .catch(error => console.error('Error executing query', error.stack))
})

export { router }
