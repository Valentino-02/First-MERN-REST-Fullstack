import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCharacters } from '../features/character/charactersSlice'


function Film() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  const { user } = useSelector(
    (state) => state.auth
  )
  const { film } = useSelector(
    (state) => state.film
  )
  const { characters, charactersIsLoading } = useSelector(
    (state) => state.characters
  )

  const getCharactersInFilm = (film) => {
    const out = []
    for (const filmChar of film.characters) {
      for (const character of characters) {
        if (filmChar === character.url) {
          out.push(character)
        }
      }
    }
    return out  
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])


  if (characters.length === 0 && !charactersIsLoading) {
    dispatch(getCharacters())
  }
  
  return (
    <>
      <section className='heading'>
        <h1>{film.title}</h1>
        <h3>Film Info</h3>
      </section>
      
      <section className='characters'>
        <h4>Characters in this Film</h4>
        {getCharactersInFilm(film).map((character) => (
          <p>{character.name}</p>
        ))}
      </section>
    </>
  )
}

export default Film