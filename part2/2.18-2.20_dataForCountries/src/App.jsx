import { useState, useEffect } from 'react'

import countriesService from './services/countries'

import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {
	const [countries, setCountries] = useState([])
	const [search, setSearch] = useState('')

	useEffect(() => {
		countriesService
		.getSearch(search)
		.then(list => {
			setCountries(list)
		})
	}, [])

	const handleSearchChange = (event) => {
		const newSearch = event.target.value;
		setSearch(newSearch)

		countriesService
		.getSearch(newSearch)
		.then(list => {
			setCountries(list)
		})
	}

	return (
		<>
			<Filter search={search} handleSearchChange={handleSearchChange} />
			<Countries countries={countries} search={search}/>
		</>
	)
}

export default App
