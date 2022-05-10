import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import characterService from './characterService'

const initialState = {
  character: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get character by name
export const getCharacter = createAsyncThunk(
    'character/getOne',
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

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharacter.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCharacter.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.character = action.payload
      })
      .addCase(getCharacter.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = characterSlice.actions
export default characterSlice.reducer
