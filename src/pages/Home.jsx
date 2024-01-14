import React from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PostersRow from "../components/PostersRow";

const moviesAndTVShowsLists = {
  moviesLists: [
    { endpoint: "nowPlayingMovies", title: "Now Playing Movies" },
    { endpoint: "popularMovies", title: "Popular Movies" },
    { endpoint: "topRatedMovies", title: "Top Rated Movies" },
    { endpoint: "upcomingMovies", title: "Up coming Movies" },
  ],
  TVShowsLists: [
    { endpoint: "airingTodayTVShows", title: "Airing Today TV Shows" },
    { endpoint: "onTheAirTVShows", title: "On The Air TV Shows" },
    { endpoint: "popularTVShows", title: "Popular TV Shows" },
    { endpoint: "topRatedTVShows", title: "Top Rated TV Shows" },
  ],
};

function Home() {
  const location = useLocation();

  const currentList =
    location.pathname === "/" || location.pathname === "/movies"
      ? "moviesLists"
      : "TVShowsLists";

  return (
    <>
      <Navbar />

      <Hero type={moviesAndTVShowsLists[currentList]} />

      {moviesAndTVShowsLists[currentList].map((list) => (
        <PostersRow
          key={list.endpoint}
          sortBy={list.endpoint}
          title={list.title}
        />
      ))}
    </>
  );
}

export default Home;
