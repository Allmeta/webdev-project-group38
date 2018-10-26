import request from 'supertest'
// import { app } from '../../server'
// const apiReq = request(app)
const apiReq = request('http://localhost:5006/api')

describe('GET /api/movies - get movies', () => {
  it('should return all movies', () => {
    apiReq
      .get('/movies')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect('Content-Length', '499')
  })
})
