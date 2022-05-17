import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createFavorite } from '../features/favorite/favoriteSlice'

function FavoriteInput() {
  const [text, setText] = useState('')
  const [errorText, setErrorText] = useState('')

  const { characters } = useSelector(
    (state) => state.character
  )
  const { favorites } = useSelector(
    (state) => state.favorite
  )

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    // Remember to rewrite this, so it is cleaner
    for (const character of characters) {
      for (const favorite of favorites) {
        if (favorite.text === text) {
          setErrorText('Character already in favorites')
          return
        }

      }
      if (character.name === text) {
        dispatch(createFavorite({ text }))
        setText('')
        setErrorText('')
      } else {
        setErrorText('Invalid name, please enter a valid name')
      }
    }
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
        <h4>{errorText}</h4>
      </form>
      <br></br>
    </section>
  )
}

export default FavoriteInput