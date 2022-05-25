import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function Planet() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(
    (state) => state.auth
  )
  const { planet } = useSelector(
    (state) => state.planet
  )
  const { characters } = useSelector(
    (state) => state.characters
  )

  const getCharactersInPlanet = (planet) => {
    const out = []
    for (const planetChar of planet.residents){
      for (const character of characters) {
        if (planetChar === character.url) {
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
  }, [user, navigate, dispatch])

  return (
    <>
      <section className='heading'>
        <h1>{planet.name}</h1>
        <h3>Planet Info</h3>
      </section>
      
      <section className='characters'>
        <h4>Characters Born in this Planet</h4>
        {getCharactersInPlanet(planet).map((character) => (
          <p>{character.name}</p>
        ))}
      </section>
    </>
  )
}

export default Planet