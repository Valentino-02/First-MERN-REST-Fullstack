import { useDispatch } from 'react-redux'
import { deleteFavorite } from '../features/favorites/favoriteSlice'

function FavoriteItem({ favorite }) {
  const dispatch = useDispatch()

  return (
    <div className='favorite'>
      <div>{new Date(favorite.createdAt).toLocaleString('en-US')}</div>
      <h2>{favorite.text}</h2>
      <button onClick={() => dispatch(deleteFavorite(favorite._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default FavoriteItem