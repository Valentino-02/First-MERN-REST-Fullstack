import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCharacter } from "../features/character/characterSlice";

function Intro() {
  const dispatch = useDispatch;

  const { user } = useSelector((state) => state.auth);
  const { characters } = useSelector((state) => state.characters);

  if (characters.length === 0) {
    dispatch(getCharacter());
  }

  return (
    <>
      <section className="heading">
        {user ? (
          <>
            <h1>Welcome {user.name}</h1>
            <h5>To start, go to Search Character </h5>
            <p>
              This is the first app that I made, and the main objective was to
              learn some of the most standard and basic technologies used in web
              development.Focus was put the interaction between a public
              API, the backend API, a database, and the frontend client.
              <br />
              You can search the name of a Star Wars character, and get the
              films it appeared in, and its native planet. There is also a
              Favorite page, where you can save some favorite names (mainly to
              test the database)
            </p>
          </>
        ) : (
          <>
            <h2>Please Register or Login</h2>
          </>
        )}
      </section>
    </>
  );
}

export default Intro;
