import axios from 'axios'

const API_URL = '/api/planet/'

// Get planet by character name
const getPlanet = async (name, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + name, config)

    return response.data
}


const planetService = {
    getPlanet
}

export default planetService