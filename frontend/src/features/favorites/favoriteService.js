import axios from 'axios'

const API_URL = '/api/favorite/'

// Add new favorite character
const createFavorite = async (favoriteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, favoriteData, config)

  return response.data
}

// Get list of favorites
const getFavorites = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete favorite from list
const deleteFavorite = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + goalId, config)

  return response.data
}

const favoriteService = {
  createFavorite,
  getFavorites,
  deleteFavorite,
}

export default favoriteService