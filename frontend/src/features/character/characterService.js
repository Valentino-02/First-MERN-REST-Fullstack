import axios from 'axios'

const API_URL = '/api/character/'

// Get character by name
const getCharacter = async (name, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
            name: name
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Get full list of characters
const getCharacters = async (token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const characterService = {
    getCharacter,
    getCharacters
}

export default characterService