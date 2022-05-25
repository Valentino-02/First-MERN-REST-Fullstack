import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import characterService from './characterService'

const initialState = {
  characters: [],
  charactersIsError: false,
  charactersIsSuccess: false,
  charactersIsLoading: false,
  charactersMessage: '',
}

// Get all characters
export const getCharacters = createAsyncThunk(
  'characters/get',
  async (_, thunkAPI) => {
      try {
          const token = thunkAPI.getState().auth.user.token
          return await characterService.getCharacters(token)
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

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    charactersReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharacters.pending, (state) => {
        state.charactersIsLoading = true
      })
      .addCase(getCharacters.fulfilled, (state, action) => {
        state.charactersIsLoading = false
        state.charactersIsSuccess = true
        state.characters = action.payload
      })
      .addCase(getCharacters.rejected, (state, action) => {
        state.charactersIsLoading = false
        state.charactersIsError = true
        state.charactersMessage = action.payload
      })
  },
})

export const { charactersReset } = charactersSlice.actions
export default charactersSlice.reducer