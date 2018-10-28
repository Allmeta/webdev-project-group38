import request from 'supertest'
import { close, server } from '../../server'

describe('GET /api/movies - get movies', () => {
  afterAll(() => close())

  it('should return json and 200 status code', (done) => {
    return request(server)
      .get('/api/movies')
      .expect(200)
      .expect('Content-Type', /json/, done)
  })

  it('should return all movies', () => {
    request(server)
      .get('/api/movies')
      .then(response => {
        expect(response.body).toHaveLength(508)
      })
  })
})
