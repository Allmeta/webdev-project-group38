import express from 'express'
import { pool } from '../dbConnect'

const router = express.Router()

router.get('/movies', (req, res) => {
  let query
  if (req.query.search) {
    query = {
      text: 'SELECT * FROM movie WHERE title LIKE $1',
      values: [`%${req.query.search}%`]
    }
  } else {
    query = 'SELECT * FROM movie'
  }
  pool.query(query)
    .then((movies) => {
      movies.rows.length > 0 ? res.json(movies.rows) : res.status(404).json(
        generateError(404, 'No movies matched your search query'))
    })
    .catch(() => res.status(500).json(generateError(500, 'Internal server error')))
})

router.get('/movie/:id', (req, res) => {
  if (req.params.id === undefined) {
    res.status(400).json(generateError(400, "You haven't provided an id"))
  } else {
    let query = {
      text: 'SELECT * FROM movie WHERE movie_id = $1',
      values: [`${req.params.id}`]
    }
    pool.query(query)
      .then((movie) => movie.rows.length === 1 ? res.json(movie.rows[0]) : res.status(404).json(
        generateError(404, `Could not find a movie with id ${req.params.id}`)
      ))
      .catch(() => res.status(500).json(generateError(500, 'Internal server error')))
  }
})

function generateError (status, errorMessage) {
  return { status: status, error: errorMessage }
}

export { router }
