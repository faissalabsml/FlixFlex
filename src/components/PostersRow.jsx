import React, { useEffect, useReducer } from "react";

import Posters from "./Posters";
import Loading from "./Loading";
import { getPosters } from "../utils/api";

const postersReducer = (state, action) => {
  if (action.type === "success") {
    return {
      ...state,
      posters: action.posters,
      loading: false,
    };
  } else if (action.type === "error") {
    return {
      ...state,
      errorMessage: action.message,
      loading: false,
    };
  } else {
    throw new Error("Action type is not supported");
  }
};

const initialState = {
  posters: [],
  errorMessage: null,
  loading: true,
};

function PostersRow({ sortBy, title }) {
  const [state, dispatch] = useReducer(postersReducer, initialState);

  console.log(sortBy);

  useEffect(() => {
    getPosters(sortBy)
      .then((results) => {
        dispatch({ type: "success", posters: results.slice(0, 10) });
      })
      .catch(({ message }) => dispatch({ type: "error", message }));
  }, []);

  if (state.loading) return <Loading text={`Loading ${title}...`} />;

  if (state.errorMessage)
    return <p className="message">{state.errorMessage}</p>;

  return (
    <section className="posters">
      <h2 className="section_title">{title}</h2>
      <Posters postersList={state.posters} />
    </section>
  );
}

export default PostersRow;
