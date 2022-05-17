import axios from 'axios'

const API_URL = '/api/film/'

// Get films by character name
const getFilms = async (name, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + name, config)

    return response.data
}


const filmService = {
    getFilms
}

export default filmService