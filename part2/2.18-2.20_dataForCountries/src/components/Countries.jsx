import Country from "./Country"
import Info from "./Info"

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
            <Info country={country}/>
        )
    } else {
        return (
            <div>
                {countries.map(country => <Country key={country.name.common} country={country}/>)}
            </div>
        )
    }
}

export default Countries