import request from 'supertest'
import express from 'express'
import { movies } from '../routes/movies'
import Joi from 'joi'

const app = express()

app.use('/api', movies)

describe('GET /api/movies - get movies', () => {
  it('should return json and 200 status code', done => {
    request(app)
      .get('/api/movies')
      .expect(200)
      .expect('Content-Type', /json/, done)
  })

  it('returns movies', done => {
    const movie = {
      movie_id: Joi.number(),
      title: Joi.string(),
      summary: Joi.string(),
      popularity: Joi.string(),
      language: Joi.string(),
      release_date: Joi.string(),
      poster_path: Joi.string(),
      comment: Joi.string().allow(''),
      rating: Joi.string()
    }

    request(app)
      .get('/api/movies')
      .then(response => {
        const { error } = Joi.validate(response.body[0], movie)
        expect(error).toEqual(null)
        done()
      })
  })

  it('should return 404 error', done => {
    request(app)
      .get('/api/movies/id/1')
      .expect(404, done)
  })

  it('should return json error object', done => {
    const errorObj = {
      status: Joi.number(),
      error: Joi.string()
    }
    request(app)
      .get('/api/movies/id/1')
      .expect('Content-Type', /json/)
      .then(response => {
        const { error } = Joi.validate(response.body[0], errorObj)
        expect(error).toEqual(null)
        done()
      })
  })
})
