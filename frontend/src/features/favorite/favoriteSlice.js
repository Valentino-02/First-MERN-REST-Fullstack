import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import favoriteService from './favoriteService'

const initialState = {
  favorites: [],
  favoriteIsError: false,
  favoriteIsSuccess: false,
  favoriteIsLoading: false,
  favoriteMessage: '',
}

// Add new favorite character
export const createFavorite = createAsyncThunk(
  'favorite/create',
  async (name, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await favoriteService.createFavorite(name, token)
  
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get list of favorites
export const getFavorites = createAsyncThunk(
  'favorite/get',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await favoriteService.getFavorites(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete favorite from list
export const deleteFavorite = createAsyncThunk(
  'favorite/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await favoriteService.deleteFavorite(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFavorite.pending, (state) => {
        state.favoriteIsLoading = true
      })
      .addCase(createFavorite.fulfilled, (state, action) => {
        state.favoriteIsLoading = false
        state.favoriteIsSuccess = true
        state.favorites.push(action.payload)
      })
      .addCase(createFavorite.rejected, (state, action) => {
        state.favoriteIsLoading = false
        state.favoriteIsError = true
        state.favoriteMessage = action.payload
      })

      .addCase(getFavorites.pending, (state) => {
        state.favoriteIsLoading = true
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.favoriteIsLoading = false
        state.favoriteIsSuccess = true
        state.favorites = action.payload
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.favoriteIsLoading = false
        state.favoriteIsError = true
        state.favoriteMessage = action.payload
      })

      .addCase(deleteFavorite.pending, (state) => {
        state.favoriteIsLoading = true
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.favoriteIsLoading = false
        state.favoriteIsSuccess = true
        state.favorites = state.favorites.filter(
          (character) => character._id !== action.payload.id
        )
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.favoriteIsLoading = false
        state.favoriteIsError = true
        state.favoriteMessage = action.payload
      })
  },
})

export const { reset } = favoriteSlice.actions
export default favoriteSlice.reducer