import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import favoriteReducer from '../features/favorites/favoriteSlice'
import characterReducer from '../features/characters/characterSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    favorites: favoriteReducer,
    character: characterReducer,
  },
})