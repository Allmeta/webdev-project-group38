import express from 'express'
import bodyParser from 'body-parser'
import { movies } from './routes/movies'
import { reviews } from './routes/reviews'
import { genres } from './routes/genres'
import { pool } from './dbConnect'

const app = express()

// Define bodyParse middleware to be used
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.use('/api', movies)
app.use('/api/movies', reviews)
app.use('/api/', genres)
app.set('port', (process.env.PORT || 5025))
const server = app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})

function close () {
  pool.end()
    .then(() => server.close())
}
export { close, server }
