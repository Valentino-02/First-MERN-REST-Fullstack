import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getCharacter,
  characterReset,
  characterSuccessReset,
} from "../features/character/characterSlice";
import { getPlanet } from "../features/planet/planetSlice";
import { getFilms } from "../features/film/filmSlice";

function CharacterSearch() {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const { character, characterIsError, characterIsSuccess, characterMessage } =
    useSelector((state) => state.character);

  if (characterIsError) {
    toast.error(characterMessage);
    dispatch(characterReset());
  }

  // Remember to ask for a better way to do this.
  if (characterIsSuccess) {
    dispatch(getFilms(character.name));
    dispatch(getPlanet(character.name));
    dispatch(characterSuccessReset());
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      toast.error("please enter a name");
    } else {
      dispatch(getCharacter(text));
    }

    setText("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Enter name of a Star Wars character</label>
          <input
            type="text"
            name="name"
            id="name_id"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Search character
          </button>
        </div>
      </form>
    </section>
  );
}

export default CharacterSearch;
