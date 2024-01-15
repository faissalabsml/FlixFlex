import React, { useEffect, useReducer } from "react";

import Posters from "./Posters";
import { getPosters } from "../utils/api";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom";

const top5Reducer = (state, action) => {
  if (action.type === "success") {
    return {
      ...state,
      top5: action.top5,
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
  top5: [],
  errorMessage: null,
  loading: true,
};

function Hero({ type }) {
  const [state, dispatch] = useReducer(top5Reducer, initialState);
  const location = useLocation();

  const popularEndpoint = type.find((el) => el.endpoint.startsWith("popular"));

  useEffect(() => {
    getPosters(popularEndpoint.endpoint)
      .then((results) => {
        dispatch({ type: "success", top5: results.slice(0, 5) });
      })
      .catch(({ message }) => dispatch({ type: "error", message }));
  }, []);

  if (state.loading) return <Loading text="Loading" />;

  if (state.errorMessage)
    return <p className="message">{state.errorMessage}</p>;

  return (
    <>
      <h1>{`Browse ${
        location.pathname === "/" || location.pathname === "/movies"
          ? "movies"
          : "tv shows"
      }`}</h1>
      <section className="top5">
        <h2 className="section_title">Current Top 5</h2>
        <Posters postersList={state.top5} />
      </section>
    </>
  );
}

export default Hero;
