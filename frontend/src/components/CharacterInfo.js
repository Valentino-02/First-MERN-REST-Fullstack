import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setFilm } from '../features/film/filmSlice'


function CharacterInfo() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { planet } = useSelector(
    (state) => state.planet
  )
  const { films } = useSelector(
    (state) => state.film
  )
  const { character } = useSelector(
    (state) => state.character
  )

  const onClickFilm = (e, film) => {
    e.preventDefault()
    dispatch(setFilm(film))
    navigate('/film')
  }

  const onClickPlanet = (e, planet) => {
    e.preventDefault()
    navigate('/planet')
  }

  return (
    <section className='form'>
      <h2> Interactable Info of {character.name}:</h2>
      <br/>
      <h4>Home Planet:</h4>
      <button className='btn btn-info' onClick={e => {onClickPlanet(e, planet)}}>{planet.name} </button>
      <br/>
      <h4>List of Films:</h4>
      {films.map((film) => (
      <button className='btn btn-info' onClick={e => {onClickFilm(e, film)}}>{film.title} </button>
      ))}
    </section>
  )
  }
  
  export default CharacterInfo