import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import planetService from './planetService'

const initialState = {
  planet: {},
  planetIsError: false,
  planetIsSuccess: false,
  planetIsLoading: false,
  planetMessage: '',
}

// Get planet by character name
export const getPlanet = createAsyncThunk(
    'planet/get',
    async (name, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await planetService.getPlanet(name, token)
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

export const planetSlice = createSlice({
  name: 'planet',
  initialState,
  reducers: {
    planetReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlanet.pending, (state) => {
        state.planetIsLoading = true
      })
      .addCase(getPlanet.fulfilled, (state, action) => {
        state.planetIsLoading = false
        state.planetIsSuccess = true
        state.planet = action.payload
      })
      .addCase(getPlanet.rejected, (state, action) => {
        state.planetIsLoading = false
        state.planetIsError = true
        state.planetMessage = action.payload
      })
  },
})

export const { planetReset } = planetSlice.actions
export default planetSlice.reducer
