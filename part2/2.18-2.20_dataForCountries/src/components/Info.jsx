import { useState, useEffect } from 'react'

import weatherService from '../services/weather'

const Info = ({ country }) => {

    const [weather, setWeather] = useState(null)
    const [icon, setIcon] = useState(null)

    useEffect(() => {
        weatherService
        .getWeather(country.capital)
        .then(result => {
            setWeather(result)
            setIcon(`https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`)
        })
    }, [])
     
    if(weather){
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
                <h2>Weather in {country.capital}</h2>
                <p>Temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
                <img src={icon} alt={weather.weather[0].description}/>
                <p>Wind {weather.wind.speed} m/s</p>
            </div>
        )
    }
}

export default Info