import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Favorite from './pages/Favorite'
import Character from './pages/Character'
import Planet from './pages/Planet'
import Film from './pages/Film'
import Intro from './pages/Intro'
import { useSelector, useDispatch } from 'react-redux'
import { getCharacters } from './features/character/charactersSlice'
import { getFilms } from './features/film/filmSlice'


// I want to fetch the characters info when the app begins. This works for now, but will have to improve it later.
function App() {
  const dispatch = useDispatch()

  const { characters, charactersIsLoading } = useSelector(
    (state) => state.characters
  )

  if (characters.length === 0 && !charactersIsLoading) {
    dispatch(getCharacters())
  }

  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/favorite' element={<Favorite />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/character' element={<Character />} />
            <Route path='/planet' element={<Planet />} />
            <Route path='/film' element={<Film />} />
            <Route path='/' element={<Intro />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App