import React, { useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import endpoints, { getPosters } from "../utils/api";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PostersRow from "../components/PostersRow";
import Loading from "../components/Loading";

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

function Home() {
  const location = useLocation();

  const contents =
    location.pathname === "/" || location.pathname === "/movies"
      ? "popularMovies"
      : "popularTVShows";

  const [state, dispatch] = useReducer(postersReducer, initialState);

  useEffect(() => {
    getPosters(contents)
      .then((results) => {
        dispatch({ type: "success", posters: results });
      })
      .catch(({ message }) => dispatch({ type: "error", message }));
  }, [contents]);

  if (state.loading) return <Loading text="Loading Posters" />;

  if (state.errorMessage)
    return <p className="message">{state.errorMessage}</p>;

  return (
    <>
      <Navbar />

      <Hero content={state.posters} />

      <PostersRow content={state.posters} title="popular" />
    </>
  );
}

export default Home;
