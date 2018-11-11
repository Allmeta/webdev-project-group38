import express from 'express'
import { pool } from '../dbConnect'
import { generateError, buildReviewsQuery, regular, identity } from '../utils'
import Joi from 'joi'

const reviews = express.Router()

reviews.get('/reviews', (req, res) => {
  pool.query(buildReviewsQuery(null, regular, null))
    .then(response => res.json(response.rows))
    .catch(() => {
      res.status(500).json(generateError(500, 'Internal server error'))
    })
})

reviews.get('/reviews/id/:id', (req, res) => {
  pool.query(
    buildReviewsQuery(
      'SELECT comment from movie WHERE movie_id = $1',
      regular,
      req.params.id
    )
  )
    .then(reviews => reviews.rows.length === 1 ? res.json(reviews.rows[0]) : res.status(404).json(
      generateError(404, 'No reviews matched the given id'))
    )
    .catch(() => res.status(500).json(generateError(500, 'Internal server error')))
})

reviews.put('/reviews', (req, res) => {
  const reviewObj = {
    id: Joi.number(),
    review: Joi.string()
  }

  const { error } = Joi.validate(req.body, reviewObj)

  if (error) {
    const errorMessages = error.details.map(obj => obj.message)
    const errorObj = {
      status: 400,
      error: errorMessages
    }
    return res.status(400).json(errorObj)
  }

  pool.query(
    buildReviewsQuery(
      'UPDATE movie SET comment = $1 WHERE movie_id = $2',
      identity,
      [req.body.review, req.body.id]
    )
  )
    .then(response =>
      response.rowCount === 1 ? res.json(req.body) : res.json(
        generateError(404, 'No movies matched the given id'))
    )
    .catch(() => res.status(500).json(generateError(500, 'Internal server error')))
})

export { reviews }
