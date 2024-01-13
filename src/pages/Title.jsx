import React, { useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";

import { getDetails } from "../utils/api";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

const titleReducer = (state, action) => {
  if (action.type === "success") {
    return {
      ...state,
      title: action.title,
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
  title: null,
  errorMessage: null,
  loading: true,
};

function Title() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const titleId = searchParams.get("id");

  const [state, dispatch] = useReducer(titleReducer, initialState);

  useEffect(() => {
    getDetails(titleId)
      .then((result) => {
        console.log(result);
        dispatch({ type: "success", title: result });
      })
      .catch(({ message }) => dispatch({ type: "error", message }));
  }, [titleId]);

  if (state.loading) return <Loading text="Loading Details" />;

  if (state.errorMessage)
    return <p className="message">{state.errorMessage}</p>;

  const {
    title,
    backdrop_path,
    poster_path,
    overview,
    release_date,
    vote_average,
    genres,
    runtime,
    imdb_id,
    videos,
    popularity,
  } = state.title;

  const trailer =
    videos.results.find((video) => video.type === "Trailer") || videos[1];
  console.log(trailer);

  if (vote_average === 0 || popularity < 1) {
    return (
      <>
        <Navbar />

        <h2 className="section_title">Sorry, not enough data available</h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section
        className="title"
        style={{ height: backdrop_path ? "auto" : "80vh" }}
      >
        {backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt={title}
            className="title_background"
          />
        )}

        <div className="title_details">
          <div className="title_poster">
            <img
              src={`https://image.tmdb.org/t/p/original/${poster_path}`}
              alt={title}
              className="title_img"
            />
          </div>

          <div className="title_info">
            <p>{title}</p>
            <p>{release_date}</p>
            <p className="title_genres">
              {genres.map((genre) => genre.name).join(", ")}
            </p>
            <p>{runtime}</p>
            <div>
              <h3>Overview</h3>
              <p>{overview}</p>
            </div>
            <p>{vote_average.toString().replace(".", "").slice(0, 2)}</p>
            <a href={`https://www.imdb.com/title/${imdb_id}`} target="_blank">
              IMDB
            </a>
            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
              >
                Watch trailer
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Title;
