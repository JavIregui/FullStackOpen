import { useState, useEffect } from 'react'
import axios from 'axios'
import Title from './components/Title'
import Filter from './components/Filter'
import Form from './components/Form'
import Contacts from './components/Contacts'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [searchName, setSearchName] = useState('')

	useEffect(() => {
		axios
		  	.get('http://localhost:3001/persons')
		  	.then(response => {
				setPersons(response.data)
		  	})
	  }, [])

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

		axios
        	.post('http://localhost:3001/persons', personObject)
            .then(response => {
                setPersons(persons.concat(response.data))
                setNewName('')
                setNewNumber('')
            })
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