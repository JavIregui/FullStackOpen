const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('give password as argument')
	process.exit(1)
} else if (process.argv.length === 4) {
	console.log('give name and number as arguments')
	process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://phonebookApp:${password}@phonebookdb.tqqz5.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=phonebookDB`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})
const Person = mongoose.model('Person', personSchema, 'contacts')

if(name === undefined && number === undefined) {
	Person.find({  }).then(result => {
		result.forEach(person => {
			console.log(person)
		})
		mongoose.connection.close()
	})
} else {
	const person = new Person({
		name: name,
		number: number,
	})

	person.save().then(result => {
		console.log(`Added ${result.name} number ${result.number} to phonebook`)
		mongoose.connection.close()
	})
}