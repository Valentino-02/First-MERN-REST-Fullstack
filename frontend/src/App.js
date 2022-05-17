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

function App() {
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