import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import favoriteReducer from '../features/favorites/favoriteSlice'
import characterReducer from '../features/characters/characterSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoriteReducer,
    character: characterReducer,
  },  
})