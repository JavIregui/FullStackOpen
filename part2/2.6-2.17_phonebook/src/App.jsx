import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', id: 1 },
	])
	const [newName, setNewName] = useState('')

	const addName = (event) => {
		event.preventDefault()

		if (persons.some(person => person.name === newName)) {
			alert(`${newName} is already added to phonebook`)
			return
		}

		const personObject = {
			name: newName,
			id: persons.length + 1,
		}

		setPersons(persons.concat(personObject))
		setNewName('')
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map(person => <div key={person.name}>{person.name}</div>)}
		</div>
	)
}

export default App