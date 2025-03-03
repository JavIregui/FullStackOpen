const config = require('./utils/config')
const logger = require('./utils/logger')
require('express-async-errors')

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
app.use(middleware.tokenExtractor)

const usersRouter = require('./controllers/users')
app.use('/api/users', usersRouter)

const loginRouter = require('./controllers/login')
app.use('/api/login', loginRouter)

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testing')
	app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app