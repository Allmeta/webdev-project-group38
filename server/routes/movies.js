import express from 'express'
import { pool } from '../dbConnect'
import { generateError, buildQuery, buildMoviesQuery, insidePercent, regular } from '../utils'

const movies = express.Router()

movies.get('/movies', (req, res) => {
  let query = {}

  if (req.query.sortOnRating === '1') {
    query = buildQuery('SELECT * FROM movie ORDER BY rating DESC')
    query = query('SELECT * FROM movie WHERE title LIKE $1 ORDER BY rating DESC', insidePercent, req.query.search)
  } else {
    query = buildMoviesQuery('SELECT * FROM movie WHERE title LIKE $1', insidePercent, req.query.search)
  }

  if (req.query.page <= 0) {
    res.status(400).send(generateError(400, 'Page number cannot be less than 1'))
  } else if (req.query.page > 0 && req.query.search) {
    req.query.sortOnRating === '1' ? query.text += ', CTID ASC LIMIT 10 OFFSET $2' : query.text += ' ORDER BY CTID ASC LIMIT 10 OFFSET $2'
    query.values.push(`${(req.query.page - 1) * 10}`)
  } else if (req.query.page > 0) {
    req.query.sortOnRating === '1' ? query.text += ', CTID ASC LIMIT 10 OFFSET $1' : query.text += ' ORDER BY CTID ASC LIMIT 10 OFFSET $1'
    query.values = [`${(req.query.page - 1) * 10}`]
  }

  pool.query(query)
    .then(movies => {
      movies.rows.length > 0 ? res.json(movies.rows) : res.status(404).json(
        generateError(404, 'No movies matched your search query or page number'))
    })
    .catch(() => res.status(500).json(generateError(500, 'Internal server error')))
})

movies.get('/movies/id/:id', (req, res) => {
  pool.query(buildMoviesQuery('SELECT * FROM movie WHERE movie_id = $1', regular, req.params.id))
    .then(movies => movies.rows.length === 1 ? res.json(movies.rows) : res.status(404).json(
      generateError(404, 'No movies matched your id'))
    )
    .catch(() => res.status(500).json(generateError(500, 'Internal server error')))
})

movies.get('/movies/genre/:id', (req, res) => {
  pool.query(
    buildMoviesQuery(
      'SELECT * FROM movie WHERE movie_id IN (SELECT movie_id FROM movie_genre WHERE genre_id = $1)',
      regular,
      req.params.id)
  )
    .then(movies => movies.rows.length > 0 ? res.json(movies.rows) : res.status(404).json(
      generateError(404, 'No movies matched your id'))
    )
    .catch(() => res.status(500).json(generateError(500, 'Internal server error')))
})

export { movies }
