import axios from 'axios'

const getWeather = city => {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_KEY}`

    return axios
    .get(url)
    .then(response => {
        return response.data
    })
}

export default { getWeather }