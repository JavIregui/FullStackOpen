require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const app = express()

var corsOptions = {
	origin: 'http://localhost:5173',
	optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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
})

app.get('/api/persons/:id', (request, response) => {
	Person.findById(request.params.id).then(person => {
		response.json(person)
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
})

// app.delete('/api/persons/:id', (request, response) => {
// 	const id = request.params.id
// 	persons = persons.filter(person => person.id !== id)

// 	response.status(204).end()
// })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}...`)
})