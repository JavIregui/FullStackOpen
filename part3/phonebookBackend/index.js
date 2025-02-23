require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

var corsOptions = {
	origin: 'http://localhost:5173',
	optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// app.get('/info', (request, response) => {
// 	response.send(`
// 		<p>Phonebook has info for ${persons.length} people</p>
// 		<p>${new Date()}</p>
// 	`)
// })

app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
	.catch(error => {
		next(error)
	})
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => {
			next(error)
		})
})

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (body.name === undefined || body.number === undefined) {
		return response.status(400).json({
			error: 'content missing'
		})
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person.save().then(savedPerson => {
		response.json(savedPerson)
	})
	.catch(error => {
		next(error)
	})
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
	.then(result => {
		response.status(204).end()
	})
	.catch(error => {
		next(error)
	})
})

app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body
  
	const person = {
	  name: body.name,
	  number: body.number,
	}
  
	Person.findByIdAndUpdate(request.params.id, person, { new: true })
	.then(updatedPerson => {
		response.json(updatedPerson)
	})
	.catch(error => {
		next(error)
	})
  })

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}

	next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}...`)
})