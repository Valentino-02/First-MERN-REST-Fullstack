import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CharacterSearch from '../components/CharacterSearch'
import Spinner from '../components/Spinner'
import { characterReset, getCharacters } from '../features/character/characterSlice'
import { planetReset } from '../features/planet/planetSlice'
import { filmReset, setFilm } from '../features/film/filmSlice'

function Character() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(
    (state) => state.auth
  )
  const { planet, planetIsLoading } = useSelector(
    (state) => state.planet
  )
  const { films, filmIsLoading, } = useSelector(
    (state) => state.film
  )
  const { character, characterIsLoading, characterIsError, characterMessage } = useSelector(
    (state) => state.character
  )

  const onClickFilm = (e, film) => {
    e.preventDefault()
    dispatch(setFilm(film))
    navigate('/film')
  }

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  useEffect(() => {
    dispatch(characterReset())
    dispatch(filmReset())
    dispatch(planetReset())
  }, [dispatch])

  useEffect(() => {
    dispatch(getCharacters())
  }, [dispatch])

  if (characterIsLoading || planetIsLoading || filmIsLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Character Searcher</h1>
      </section>

      <CharacterSearch />

      <section className='data'>
        {characterIsError ? (
          <p>{characterMessage}</p>
        ) : (
          <div>
            <h2>{character.name}</h2>
            <br></br>
            <h1> 
              {!isEmpty(planet) ? (
                <Link to='/planet'>Planet: {planet.name}</Link>
              ) : (
              <></>
              )}
            </h1>
            <br></br>
            {films.length > 0 ? (
              <h4>List of Films:</h4>
            ) : (
              <></>
            )}
            <div> 
              {films.map((film) => (
              <button className='btn' onClick={e => {onClickFilm(e, film)}}>{film.title} </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default Character