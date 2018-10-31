import express from 'express'
import { pool } from '../dbConnect'
import { generateError } from '../utils'
import Joi from 'joi'

const reviews = express.Router()

reviews.get('/reviews', (req, res) => {
  pool.query('SELECT comment FROM movie')
    .then(response => res.json(response.rows))
    .catch(() => {
      res.status(500).json(generateError(500, 'Internal server error'))
    })
})

reviews.get('/reviews/id/:id', (req, res) => {
  const query = {
    text: 'SELECT comment FROM movie WHERE movie_id = $1',
    values: [`${req.params.id}`]
  }
  pool.query(query)
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

  const query = {
    text: 'UPDATE movie SET comment = $1 WHERE movie_id = $2',
    values: [req.body.review, req.body.id]
  }

  pool.query(query)
    .then(response =>
      response.rowCount === 1 ? res.json(req.body) : res.json(
        generateError(404, 'No movies matched the given id'))
    )
    .catch(() => res.status(500).json(generateError(500, 'Internal server error')))
})

export { reviews }
