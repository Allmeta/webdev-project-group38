import express from 'express'
import { pool } from '../dbConnect'

const router = express.Router()

router.get('/movies', (req, res) => {
  let query = 'SELECT * FROM movie'
  if (req.query.search) {
    query = {
      text: 'SELECT * FROM movie WHERE title LIKE $1',
      values: [`%${req.query.search}%`]
    }
  }
  pool.query(query)
    .then(movies => {
      movies.rows.length > 0 ? res.json(movies.rows) : res.status(404).json(
        generateError(404, 'No movies matched your search query or id'))
    })
    .catch(() => res.status(500).json(generateError(500, 'Internal server error')))
})

router.get('/movies/:id', (req, res) => {
  if (req.params.id === undefined) {
    res.json(generateError(400, 'No id provided'))
  }
  let query = {
    text: 'SELECT * FROM movie WHERE movie_id = $1',
    values: [`${req.params.id}`]
  }
  pool.query(query)
    .then(movies => movies.rows.length === 1 ? res.json(movies.rows) : res.status(404).json(
      generateError(404, 'No movies matched your search query or id'))
    )
    .catch(() => res.status(500).json(generateError(500, 'Internal server error')))
})

function generateError (status, errorMessage) {
  return { status: status, error: errorMessage }
}

export { router }
