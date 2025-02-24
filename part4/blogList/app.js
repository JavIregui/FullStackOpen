const config = require('./utils/config')
const logger = require('./utils/logger')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

const express = require('express')
const app = express()
const middleware = require('./utils/middleware')

const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))
app.use(express.json())

app.use(middleware.requestLogger)
const morgan = require('morgan')
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app