import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCharacter } from '../features/characters/characterSlice'

function SearchCharacter() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(getCharacter({ text }))
    setText('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Enter name of character</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Search character
          </button>
        </div>
      </form>
    </section>
  )
}

export default SearchCharacter