import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import favoriteReducer from '../features/favorite/favoriteSlice'
import characterReducer from '../features/character/characterSlice'
import charactersReducer from '../features/character/charactersSlice'
import planetReducer from '../features/planet/planetSlice'
import filmReducer from '../features/film/filmSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorite: favoriteReducer,
    character: characterReducer,
    characters: charactersReducer,
    planet: planetReducer,
    film: filmReducer
  },  
})