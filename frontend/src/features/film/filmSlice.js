import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import filmService from './filmService'

const initialState = {
  films: [],
  film: {},
  filmIsError: false,
  filmIsSuccess: false,
  filmIsLoading: false,
  filmMessage: '',
}

// Get film by character name
export const getFilms = createAsyncThunk(
    'film/get',
    async (name, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await filmService.getFilms(name, token)
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

export const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    filmReset: (state) => initialState,
    setFilm: (state, action) => {state.film = action.payload}
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilms.pending, (state) => {
        state.filmIsLoading = true
      })
      .addCase(getFilms.fulfilled, (state, action) => {
        state.filmIsLoading = false
        state.filmIsSuccess = true
        state.films = action.payload
      })
      .addCase(getFilms.rejected, (state, action) => {
        state.filmIsLoading = false
        state.filmIsError = true
        state.filmMessage = action.payload
      })
  },
})

export const { filmReset, setFilm } = filmSlice.actions
export default filmSlice.reducer