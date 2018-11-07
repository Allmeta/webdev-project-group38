import request from 'supertest'
import Joi from 'joi'
import express from 'express'
import { reviews } from '../../routes/reviews'

const app = express()
app.use('/api/movies', reviews)

describe('GET /api/movies/reviews - get reviews', () => {
  it('should return json and 200 status code', done => {
    return request(app)
      .get('/api/movies/reviews')
      .expect(200)
      .expect('Content-Type', /json/, done)
  })

  it('should return a review object', done => {
    const review = {
      comment: Joi.string().allow('')
    }

    return request(app)
      .get('/api/movies/reviews')
      .then(response => {
        const { error } = Joi.validate(response.body[0], review)
        expect(error).toEqual(null)
        done()
      })
  })

  describe('GET /api/movies/reviews/id - get review by id', () => {
    it('should return 404 error', done => {
      return request(app)
        .get('/api/movies/reviews/id/1')
        .expect(404, done)
    })

    it('should return json error object', done => {
      const errorObj = {
        status: Joi.number(),
        error: Joi.string()
      }
      return request(app)
        .get('/api/movies/reviews/id/1')
        .expect('Content-Type', /json/)
        .then(response => {
          const { error } = Joi.validate(response.body[0], errorObj)
          expect(error).toEqual(null)
          done()
        })
    })

    it('should return reviews object', done => {
      const reviewObj = {
        comment: Joi.string().allow('')
      }
      return request(app)
        .get('/api/movies/reviews/id/402900')
        .expect('Content-Type', /json/)
        .then(response => {
          const { error } = Joi.validate(response.body, reviewObj)
          expect(error).toEqual(null)
          done()
        })
    })
  })
})

describe('PUT /api/movies/reviews - update review object', () => {
  it('should return the response object and 200 status code', done => {
    const respObj = {
      id: Joi.number().required(),
      review: Joi.string().required()
    }
    const postObj = {
      id: 402900,
      review: 'Good adaptation btw (Updated by the test)'
    }
    request(app)
      .put('/api/movies/reviews')
      .send(JSON.stringify(postObj))
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        const { error } = Joi.validate(response.body, respObj)
        expect(error).toEqual(null)
        done()
      })
  })
})
