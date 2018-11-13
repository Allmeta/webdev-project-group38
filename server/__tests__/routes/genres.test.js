import request from 'supertest'
import express from 'express'
import { genres } from '../../routes/genres'
import Joi from 'joi'
import { pool } from '../../dbConnect'

const app = express()

app.use('/api', genres)

afterAll(async () => {
  await pool.end()
})

describe('GET api/genres - get genres', () => {
  it('should return json and 200 status code', done => {
    request(app)
      .get('/api/genres')
      .expect(200)
      .expect('Content-Type', /json/, done)
  })
  it('returns genres', done => {
    const genre = {
      genre_id: Joi.number(),
      name: Joi.string()
    }
    request(app)
      .get('/api/genres')
      .then(response => {
        const { error } = Joi.validate(response.body[0], genre)
        expect(error).toEqual(null)
        done()
      })
  })
  it('should return 404 error', done => {
    request(app)
      .get('/api/genres?search=meme')
      .expect(404, done)
  })
})

describe('GET api/genres/ratings - get average ratings', () => {
  it('should return json and 200 status code', done => {
    request(app)
      .get('/api/genres/ratings')
      .expect(200)
      .expect('Content-Type', /json/, done)
  })

  it('returns average ratings', done => {
    const ratingObj = {
      name: Joi.string(),
      avg: Joi.string()
    }

    request(app)
      .get('/api/genres/ratings')
      .then(response => {
        const { error } = Joi.validate(response.body[0], ratingObj)
        expect(error).toEqual(null)
        done()
      })
  })
})
