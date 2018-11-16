import express from 'express'
import { pool } from '../dbConnect'
import { generateError,
  buildQuery,
  buildMoviesQuery,
  insidePercent,
  regular } from '../utils'

const movies = express.Router()

/**
 * Returns movies dependent upon given query parameters
 * - search lets you match on search results
 * - page lets you paginate the movies
 * - sortOnRating lets you sort the movies on their rating
 */
movies.get('/movies', (req, res) => {
  let query = { text: 'SELECT * FROM movie' }

  if ((req.query.sortOnRating === 'ASC' || req.query.sortOnRating === 'DESC') && req.query.search) {
    query = buildQuery(null)
    query = query(
      `SELECT * FROM movie WHERE title LIKE $1 ORDER BY rating ${req.query.sortOnRating}`,
      insidePercent,
      req.query.search)
  } else if (req.query.sortOnRating === 'ASC' || req.query.sortOnRating === 'DESC') {
    query = buildQuery(`SELECT * FROM movie ORDER BY rating ${req.query.sortOnRating}`)
    query = query(null, null, null)
  } else if (req.query.search && !req.query.sortOnRating) {
    query = buildMoviesQuery('SELECT * FROM movie WHERE title LIKE $1', insidePercent, req.query.search)
  } else if (req.query.sortOnRating) {
    return res.json(generateError(400, 'Bad request sortOnRating has an incorrect value'))
  }

  if (req.query.page <= 0) {
    res.status(400).send(generateError(400, 'Page number cannot be less than 1'))
  } else if (req.query.page > 0 && req.query.search) {
    req.query.sortOnRating ? query.text += ', CTID ASC LIMIT 10 OFFSET $2' : query.text += ' ORDER BY CTID ASC LIMIT 10 OFFSET $2'
    query.values.push(`${(req.query.page - 1) * 10}`)
  } else if (req.query.page > 0) {
    req.query.sortOnRating ? query.text += ', CTID ASC LIMIT 10 OFFSET $1' : query.text += ' ORDER BY CTID ASC LIMIT 10 OFFSET $1'
    query.values = [`${(req.query.page - 1) * 10}`]
  }

  pool.query(query)
    .then(movies => {
      movies.rows.length > 0 ? res.json(movies.rows) : res.status(404).json(
        generateError(404, 'No movies matched your search query or page number'))
    })
    .catch(() => res.status(500).json(generateError(500, 'Internal server error')))
})

// Returns a specific movie for a given movie_id
movies.get('/movies/id/:id', (req, res) => {
  pool.query(buildMoviesQuery('SELECT * FROM movie WHERE movie_id = $1', regular, req.params.id))
    .then(movies => movies.rows.length === 1 ? res.json(movies.rows) : res.status(404).json(
      generateError(404, 'No movies matched your id'))
    )
    .catch(() => res.status(500).json(generateError(500, 'Internal server error')))
})

// Returns all movies which have a given genre associated with it
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
