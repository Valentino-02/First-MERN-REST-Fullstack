import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CharacterSearch from "../components/CharacterSearch";
import CharacterInfo from "../components/CharacterInfo";
import Spinner from "../components/Spinner";
import { characterReset } from "../features/character/characterSlice";
import "./character.css";

function Character() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { planetIsLoading } = useSelector((state) => state.planet);
  const { filmIsLoading } = useSelector((state) => state.film);
  const { character, characterIsLoading } = useSelector(
    (state) => state.character
  );

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(characterReset());
  }, [dispatch]);

  if (characterIsLoading || planetIsLoading || filmIsLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Character Searcher</h1>
      </section>

      <CharacterSearch />

      {!isEmpty(character) && <CharacterInfo />}
    </>
  );
}

export default Character;
