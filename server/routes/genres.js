import express from 'express'
import { pool } from '../dbConnect'
import { generateError, buildGenresQuery, insidePercent, regular } from '../utils'

const genres = express.Router()

genres.get('/genres', (req, res) => {
  pool.query(
    buildGenresQuery(
      'SELECT * FROM genre WHERE name LIKE $1',
      insidePercent,
      req.query.search
    )
  )
    .then(movies => {
      movies.rows.length > 0 ? res.json(movies.rows) : res.status(404).json(
        generateError(404, 'No genres matched your search query or id'))
    })
    .catch(() => res.status(500).json(generateError(500, 'Internal server error')))
})

// genre of a movie
genres.get('/genres/movie/:id', (req, res) => {
  pool.query(
    buildGenresQuery(
      'SELECT * FROM genre WHERE genre_id IN (SELECT genre_id FROM movie_genre WHERE movie_id = $1)',
      regular,
      req.params.id
    )
  )
    .then(movies => movies.rows.length > 0 ? res.json(movies.rows) : res.status(404).json(
      generateError(404, 'No genres matched your search query or id'))
    )
    .catch(() => res.status(500).json(generateError(500, 'Internal server error')))
})

export { genres }
