const Countries = ({ countries, search }) => {
    const exact = countries.filter(country => country.name.common.toLowerCase() === search.toLowerCase())

    if(countries.length === 0) {
        return (
            <div>
                <p>No countries found</p>
            </div>
        )
    } else if (countries.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    } else if(countries.length == 1 || exact.length > 0) {

        let country
        if(exact.length > 0) { 
            country = exact[0]
        } else {
            country = countries[0]
        }

        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area} km²</p>
                <p>Population: {country.population}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={country.flags.png} alt={country.name.common} width="250px" />
            </div>
        )
    } else {
        return (
            <div>
                {countries.map(country => <p key={country.name.common}> {country.name.common} </p>)}
            </div>
        )
    }
}

export default Countries