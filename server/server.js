import express from 'express'
import bodyParser from 'body-parser'
import { router } from './routes/movies'
import { pool } from './dbConnect'

const app = express()

// Define bodyParse middleware to be used
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.use('/api', router)
app.set('port', (process.env.PORT || 5021))
const server = app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})

function close () {
  pool.end()
  server.close()
}
export { close, server }
