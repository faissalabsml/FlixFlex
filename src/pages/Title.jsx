import React, { useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import { LinkChain, Play } from "@vectopus/atlas-icons-react";

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

function toHoursAndMinutes(totalMinutes) {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
}

function Title() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const titleId = searchParams.get("id");
  const type = searchParams.get("type");

  const [state, dispatch] = useReducer(titleReducer, initialState);

  useEffect(() => {
    getDetails(type, titleId)
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
    name,
    backdrop_path,
    poster_path,
    overview,
    release_date,
    first_air_date,
    vote_average,
    genres,
    runtime,
    episode_run_time,
    imdb_id,
    videos,
    popularity,
  } = state.title;

  const trailer =
    videos.results.find((video) => video.type === "Trailer") || videos[1];

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

      <section className="title-section">
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
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={title}
              className="title_img"
            />
          </div>

          <div className="title_info">
            <div className="title_info_header">
              <h3 className="title">
                {title || name}
                <span>
                  {release_date
                    ? release_date.slice(0, 4)
                    : first_air_date.slice(0, 4)}
                </span>
              </h3>
              <p className="title_genres">
                {genres.map((genre) => genre.name).join(", ")}
              </p>
              <p>{toHoursAndMinutes(runtime || episode_run_time)}</p>
            </div>
            <p className="poster_vote">
              {vote_average.toString().replace(".", "").slice(0, 2)}
            </p>
            <div className="title_overview">
              <h4>Overview</h4>
              <p>{overview}</p>
            </div>
            <div className="title_info_footer">
              <a href={`https://www.imdb.com/title/${imdb_id}`} target="_blank">
                <LinkChain size={24} />
                IMDB
              </a>
            </div>
          </div>
        </div>
      </section>

      {trailer && (
        <div className="trailer">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      )}
    </>
  );
}

export default Title;
