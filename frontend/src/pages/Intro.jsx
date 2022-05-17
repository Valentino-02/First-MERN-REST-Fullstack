import { useSelector } from 'react-redux'

function Intro() {

  const { user } = useSelector(
    (state) => state.auth
  )

  return (
    <>
      <section className='heading'>
      {user ? (
          <h1>Welcome {user.name}</h1>
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