import express from 'express'
import { pool } from '../dbConnect'
import { generateError } from './movies'
import Joi from 'joi'

const reviews = express.Router('/movies')

reviews.get('/reviews', (req, res) => {
  pool.query('SELECT comment FROM movie')
    .then(response => res.json(response.rows))
    .catch(() => {
      res.status(500).json(generateError(500, 'Internal server error'))
    })
})

reviews.post('/reviews', (req, res) => {
  const reviewObj = {
    id: Joi.number(),
    review: Joi.string()
  }

  const { error, value } = Joi.validate(req.body, reviewObj)

  if (error) return res.status(400).send(error)

  res.json(value)
})

export { reviews }
