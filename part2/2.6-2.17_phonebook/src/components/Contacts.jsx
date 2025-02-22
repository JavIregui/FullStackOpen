import Person from './Person'
import Title from './Title'

const Contacts = ({ persons, deletePerson }) => {
	return (
		<div>
			<Title text='Numbers' />
			{persons.map(person => <Person key={person.name} person={person} deletePerson={deletePerson}/>)}
		</div>
	)
}

export default Contacts