import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import FavoriteInput from '../components/FavoriteInput'
import FavoriteItem from '../components/FavoriteItem'
import Spinner from '../components/Spinner'
import { getFavorites, reset } from '../features/favorite/favoriteSlice'
import { getCharacters } from '../features/character/charactersSlice'

function Favorite() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(
    (state) => state.auth
  )
  const { favorites, favoriteIsLoading} = useSelector(
    (state) => state.favorite
  )

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    dispatch(getFavorites())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, dispatch])

  useEffect(() => {
    dispatch(getCharacters())
  }, [dispatch])


  if (favoriteIsLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user.name}</h1>
        <p>This are your Favorite Characters</p>
      </section>

      <FavoriteInput />

      <section className='content'>
        {favorites.length > 0 ? (
          <div className='favorites'>
            {favorites.map((favorite) => (
              <FavoriteItem key={favorite._id} character={favorite} />
            ))}
          </div>
        ) : (
          <h3>You have not set any favorites</h3>
        )}
      </section>
    </>
  )
}

export default Favorite