import { useState } from 'react'
import Title from './components/Title'
import Filter from './components/Filter'
import Form from './components/Form'
import Contacts from './components/Contacts'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [searchName, setSearchName] = useState('')

	const contactsToShow = searchName === '' ? persons : persons.filter(person => person.name.includes(searchName))

	const addPerson = (event) => {
		event.preventDefault()

		if (persons.some(person => person.name === newName)) {
			alert(`${newName} is already added to phonebook`)
			return
		}

		const personObject = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		}

		setPersons(persons.concat(personObject))
		setNewName('')
		setNewNumber('')
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}
	const handleSearchChange = (event) => {
        setSearchName(event.target.value)
    }

	return (
		<div>
			<Title text='Phonebook'/>
			<Filter searchName={searchName} handleSearchChange={handleSearchChange} />
			<Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
			<Contacts persons={contactsToShow} />
		</div>
	)
}

export default App