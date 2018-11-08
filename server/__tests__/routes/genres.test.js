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

describe('meme test', () => {
  it('should be true', () => {
    expect(true).toBeTruthy()
  })
})
