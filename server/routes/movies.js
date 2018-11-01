import express from 'express'
import { pool } from '../dbConnect'
import { generateError } from '../utils'

const movies = express.Router()

movies.get('/movies', (req, res) => {
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

movies.get('/movies/id/:id', (req, res) => {
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

movies.get('/movies/genre/:id', (req, res) => {
  let query = {
    text: 'SELECT * FROM movie WHERE movie_id IN (SELECT movie_id FROM movie_genre WHERE genre_id = $1)',
    values: [`${req.params.id}`]
  }
  pool.query(query)
    .then(movies => movies.rows.length > 0 ? res.json(movies.rows) : res.status(404).json(
      generateError(404, 'No movies matched your search query or id'))
    )
    .catch(() => res.status(500).json(generateError(500, 'Internal server error')))
})

export { movies }
