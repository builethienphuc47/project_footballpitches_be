require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoString = process.env.DATABASE_URL

const UsersRouter = require('./routes/users')
const OrdersRouter = require('./routes/orders')
const PitchesRouter = require('./routes/pitches')

mongoose.connect(
  'mongodb+srv://admin:0123456@cluster0.ii71b58.mongodb.net/test',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected')
})
const app = express()

app.use(express.json())

const PORT = process.env.PORT || 5050

app.listen(process.env.PORT || 5050, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.use(cors({ origin: '*', credentials: true }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
})
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('', UsersRouter)
app.use('', OrdersRouter)
app.use('', PitchesRouter)
