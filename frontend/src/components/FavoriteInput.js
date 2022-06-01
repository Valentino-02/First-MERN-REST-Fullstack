import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createFavorite } from '../features/favorite/favoriteSlice'
import { toast } from 'react-toastify'
import { getCharacter, characterReset } from '../features/character/characterSlice'

function FavoriteInput() {
  const dispatch = useDispatch()

  const [text, setText] = useState('')

  const { characterIsError, characterIsSuccess, characterMessage } = useSelector(
    (state) => state.character
  )
  const { favorites } = useSelector(
    (state) => state.favorite
  )


  if (characterIsError) {
    toast.error(characterMessage)
    dispatch(characterReset())
    setText('')
  }

  if (characterIsSuccess) {
    dispatch(createFavorite( {text}))
    dispatch(characterReset())
    setText('')
  }

  const onSubmit = (e) => {
    e.preventDefault()

    for (const favorite of favorites) {
      if (favorite.text === text) {
        toast.error('Character already in Favorites')
        return
      } 
    }

    dispatch(getCharacter( text ))
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Add a character</label>
          <input
            type='text'
            name='name'
            id='text_id'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Favorite Character
          </button>
        </div>
      </form>
      <br></br>
    </section>
  )
}

export default FavoriteInput