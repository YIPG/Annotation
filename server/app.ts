import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import route from './routes/route'

const app = express()
app.use(cors())
app.use(express.static('public'))

// Check DB Connection

mongoose.connect('mongodb://mongo:27017/annotation', {
  useNewUrlParser: true,
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('connection OK'))

// Routing
app.use('/', route)

app.listen(process.env.PORT || 5001, () =>
  console.log(
    process.env.PORT ? 'working at ' + process.env.PORT : 'working at 5001'
  )
)
