import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'


function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      {user ? (
        <>
          <div>
           <Link to='/character'>Search Character</Link>
          </div>
          <div>
            <Link to='/favorite'>Favorites</Link>
          </div>
          <div>
            <p>{user.name} </p>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </>
      ) : (
        <ul>
          <li>
            <Link to='/login'>
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li>
            <Link to='/register'>
              <FaUser /> Register
            </Link>
          </li>   
        </ul>
      )}
  </header>
  )
}

export default Header