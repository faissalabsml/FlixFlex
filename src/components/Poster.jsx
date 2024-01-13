import React from "react";
import { Link } from "react-router-dom";

function Posters({ posterInfo }) {
  const {
    id,
    title,
    name,
    poster_path,
    release_date,
    first_air_date,
    vote_average,
  } = posterInfo;

  const searchParams = `?id=${id}&type=${first_air_date ? "tv" : "movie"}`;

  return (
    <li className="posters_item">
      <Link
        to={{
          pathname: "/title",
          search: searchParams,
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt={title}
          className="poster_img"
        />
      </Link>
      <div className="poster_info">
        <p className="poster_vote">
          {vote_average && vote_average.toString().replace(".", "").slice(0, 2)}
        </p>
        <Link
          to={{
            pathname: "/title",
            search: searchParams,
          }}
          className="poster_title"
        >
          {title || name}
        </Link>
        <p className="poster_date">
          {release_date && release_date.slice(0, 4)}
          {first_air_date && first_air_date.slice(0, 4)}
        </p>
      </div>
    </li>
  );
}

export default Posters;
