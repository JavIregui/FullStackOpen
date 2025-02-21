import Title from './Title'

const Form = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
	return (
		<div>
			<Title text='add a new' />
			<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
					<br/>
					number: <input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</div>
	)
}

export default Form