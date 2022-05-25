import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import characterService from './characterService'

const initialState = {
  character: {},
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


export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    characterReset: (state) => {
      state.character= {}
      state.characterIsError= false
      state.characterIsSuccess= false
      state.characterIsLoading= false
      state.characterMessage= ''
    },
    characterSuccessReset: (state) => {state.characterIsSuccess = false}
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
  },
})

export const { characterReset, characterSuccessReset } = characterSlice.actions
export default characterSlice.reducer
