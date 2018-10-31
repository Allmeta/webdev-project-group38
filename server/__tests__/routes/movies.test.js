import request from 'supertest'
import { close, server } from '../../server'
import Joi from 'joi'

describe('GET /api/movies - get movies', () => {
  afterAll(() => close().then(() => console.log('Pool ended and server')))

  it('should return json and 200 status code', done => {
    return request(server)
      .get('/api/movies')
      .expect(200)
      .expect('Content-Type', /json/, done)
  })

  it('should return a movie object', done => {
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

    return request(server)
      .get('/api/movies')
      .then(response => {
        const { error } = Joi.validate(response.body[0], movie)
        expect(error).toEqual(null)
        done()
      })
  })

  it('should return 404 error', done => {
    return request(server)
      .get('/api/movies/1')
      .expect(404, done)
  })

  it('should return json error object', done => {
    const errorObj = {
      status: Joi.number(),
      error: Joi.string()
    }
    return request(server)
      .get('/api/movies/1')
      .expect('Content-Type', /json/)
      .then(response => {
        const { error } = Joi.validate(response.body[0], errorObj)
        expect(error).toEqual(null)
        done()
      })
  })
})
