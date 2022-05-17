import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import characterService from './characterService'

const initialState = {
  character: {},
  characters: [],
  characterIsError: false,
  characterIsSuccess: false,
  characterIsLoading: false,
  characterMessage: '',
}

// Get character by name
export const getCharacter = createAsyncThunk(
    'character/get',
    async (name, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await characterService.getCharacter(name, token)
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

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    characterReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharacter.pending, (state) => {
        state.characterIsLoading = true
      })
      .addCase(getCharacter.fulfilled, (state, action) => {
        state.characterIsLoading = false
        state.characterIsSuccess = true
        state.character = action.payload
      })
      .addCase(getCharacter.rejected, (state, action) => {
        state.characterIsLoading = false
        state.characterIsError = true
        state.characterMessage = action.payload
      })

      .addCase(getCharacters.pending, (state) => {
        state.characterIsLoading = true
      })
      .addCase(getCharacters.fulfilled, (state, action) => {
        state.characterIsLoading = false
        state.characterIsSuccess = true
        state.characters = action.payload
      })
      .addCase(getCharacters.rejected, (state, action) => {
        state.characterIsLoading = false
        state.characterIsError = true
        state.characterMessage = action.payload
      })
  },
})

export const { characterReset } = characterSlice.actions
export default characterSlice.reducer
