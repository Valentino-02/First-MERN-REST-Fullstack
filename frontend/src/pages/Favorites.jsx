import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import FavoriteForm from '../components/FavoriteForm'
import FavoriteItem from '../components/FavoriteItem'
import Spinner from '../components/Spinner'
import { getFavorites, reset } from '../features/favorites/favoriteSlice'

function Favorites() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { favorites, isLoading, isError, message } = useSelector(
    (state) => state.favorites
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getFavorites())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Favorites Dashboard</p>
      </section>

      <FavoriteForm />

      <section className='content'>
        {favorites.length > 0 ? (
          <div className='favorites'>
            {favorites.map((favorite) => (
              <FavoriteItem key={favorite._id} favorite={favorite} />
            ))}
          </div>
        ) : (
          <h3>You have not set any favorites</h3>
        )}
      </section>
    </>
  )
}

export default Favorites