import { useState, useEffect } from 'react'

import personService from './services/persons'

import Title from './components/Title'
import Filter from './components/Filter'
import Form from './components/Form'
import Contacts from './components/Contacts'
import Notification from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [searchName, setSearchName] = useState('')
	const [message, setMessage] = useState(null)
	const [error, setError] = useState(false)

	useEffect(() => {
		personService
		.getAll()
		.then(initialPersons => {
			setPersons(initialPersons)
		})
		.catch(error => {
			setMessage('Failed to fetch data from server')
			setError(true)
			setTimeout(() => {
				setMessage(null)
			}
			, 3000)
		})
	}, [])

	const contactsToShow = searchName === '' ? persons : persons.filter(person => person.name.includes(searchName))

	const addPerson = (event) => {
		event.preventDefault()

		const existingPerson = persons.find(person => person.name === newName)
        if (existingPerson) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const updatedPerson = { ...existingPerson, number: newNumber }
                personService
                .update(existingPerson.id, updatedPerson)
                .then(returnedPerson => {
                    setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
                    setNewName('')
                    setNewNumber('')

					setMessage(`Updated ${returnedPerson.name}`)
					setError(false)
					setTimeout(() => {
						setMessage(null)
					}
					, 3000)
                })
				.catch(error => {
					setPersons(persons.filter(person => person.id !== existingPerson.id))
					setNewName('')
					setNewNumber('')

					setMessage(error.response.data.error)
					setError(true)
					setTimeout(() => {
						setMessage(null)
					}
					, 3000)
				})
            }
            return
        }

		const personObject = {
			name: newName,
			number: newNumber,
			id: `${persons.length + 1}`,
		}

		personService
		.create(personObject)
		.then(returnedPerson => {
			setPersons(persons.concat(returnedPerson))
			setNewName('')
			setNewNumber('')

			setMessage(`Added ${returnedPerson.name}`)
			setError(false)
			setTimeout(() => {
				setMessage(null)
			}
			, 3000)
		})
		.catch(error => {
			setPersons(persons.filter(person => person.id !== personObject.id))
			setNewName('')
			setNewNumber('')

			setMessage(error.response.data.error)
			setError(true)
			setTimeout(() => {
				setMessage(null)
			}
			, 3000)
		})
	}

	const deletePerson = (id) => {
        const person = persons.find(p => p.id === id)
        if (window.confirm(`Delete ${person.name}?`)) {
            personService
            .remove(id)
            .then(() => {
                setPersons(persons.filter(p => p.id !== id))

				setMessage(`Deleted ${person.name}`)
				setError(false)
				setTimeout(() => {
					setMessage(null)
				}
				, 3000)
            })
			.catch(error => {
				setPersons(persons.filter(p => p.id !== id))

				setMessage(`Information of ${person.name} has already been removed from server`)
				setError(true)
				setTimeout(() => {
					setMessage(null)
				}
				, 3000)
			})
        }
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
			<Notification message={message} error={error}/>
			<Filter searchName={searchName} handleSearchChange={handleSearchChange} />
			<Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
			<Contacts persons={contactsToShow} deletePerson={deletePerson} />
		</div>
	)
}

export default App