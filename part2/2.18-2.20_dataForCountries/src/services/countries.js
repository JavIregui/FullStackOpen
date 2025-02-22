import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getSearch = search => {
    return axios
    .get(baseUrl)
    .then(response => {
        return response.data.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    })
}

export default { getSearch }