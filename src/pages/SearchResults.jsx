import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import Posters from "../components/Posters";
import { getSearchResults } from "../utils/api";

const searchResultsReducer = (state, action) => {
  if (action.type === "success") {
    return {
      ...state,
      searchResults: action.searchResults,
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
  searchResults: [],
  errorMessage: null,
  loading: true,
};

function SearchResults() {
  const { query } = useParams();

  const [state, dispatch] = useReducer(searchResultsReducer, initialState);

  useEffect(() => {
    getSearchResults(query)
      .then((res) => {
        const filteredResults = res.results.filter(
          (result) => result.popularity > 5 && result.vote_average > 1
        );

        dispatch({ type: "success", searchResults: filteredResults });
        console.log(state.searchResults);
      })
      .catch(({ message }) => dispatch({ type: "error", message }));
  }, [query]);

  if (state.loading) return <Loading text="Loading Results" />;

  if (state.errorMessage)
    return <p className="message">{state.errorMessage}</p>;

  console.log(state.searchResults);
  return (
    <>
      <Navbar />
      <section className="posters search-results">
        <h2 className="section_title">Search results for: {query}</h2>
        {state.searchResults.length === 0 ? (
          <p>Sorry we couldn't find anything</p>
        ) : (
          <Posters postersList={state.searchResults} />
        )}
      </section>
    </>
  );
}

export default SearchResults;
