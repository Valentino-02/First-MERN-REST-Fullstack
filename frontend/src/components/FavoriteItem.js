import { useDispatch } from 'react-redux'
import { deleteFavorite } from '../features/favorite/favoriteSlice'

function FavoriteItem({ character }) {
  const dispatch = useDispatch()

  return (
    <div className='favorite'>
      <div>{new Date(character.createdAt).toLocaleString('en-US')}</div>
      <h2>{character.text}</h2>
      <button onClick={() => dispatch(deleteFavorite(character._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default FavoriteItem