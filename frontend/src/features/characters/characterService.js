import axios from 'axios'

const API_URL = '/api/character/'

// Get character by name
const getCharacter = async (name, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + '?name=' + name, config)

    return response.data
}

// Get full list of characters
const getAllCharacters = async (token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}



const goalService = {
    getCharacter,
    getAllCharacters

}

export default goalService