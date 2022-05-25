import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getCharacter } from '../features/character/characterSlice'

function Intro() {
  const dispatch = useDispatch

  const { user } = useSelector(
    (state) => state.auth
  )
  const { characters } = useSelector(
    (state) => state.characters
  )

  if (characters.length === 0) {
    dispatch(getCharacter())
  }
  
 
  return (
    <>
      <section className='heading'>
      {user ? (
        <>
          <h1>Welcome {user.name}</h1>
          <p>To start, go to Search Character </p>
        </>
      ) : (
        <>
          <h2>Please Register or Login</h2>
        </>
        )}
      </section>
    </>
  )
}

export default Intro