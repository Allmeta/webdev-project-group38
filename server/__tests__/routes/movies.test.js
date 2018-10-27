import request from 'supertest'
import { server } from '../../server'

describe('GET /api/movies - get movies', () => {
  afterAll(() => server.close())

  it('should return all movies', async (done) => {
    return request(server)
      .get('/api/movies')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body).toHaveLength(508)
        // done().catch(done)
      })
      .catch(error => console.log(error))
  })
})
