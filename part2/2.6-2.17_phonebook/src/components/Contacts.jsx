import Person from './Person'
import Title from './Title'

const Contacts = ({ persons }) => {
	return (
		<div>
			<Title text='Numbers' />
			{persons.map(person => <Person key={person.name} person={person}/>)}
		</div>
	)
}

export default Contacts