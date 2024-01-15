import axios from "axios";

const api_key = import.meta.env.VITE_TMDB_KEY;

const url = "https://api.themoviedb.org/3";

const endpoints = {
  nowPlayingMovies: `${url}/movie/now_playing?api_key=${api_key}`,
  popularMovies: `${url}/movie/popular?api_key=${api_key}`,
  topRatedMovies: `${url}/movie/top_rated?api_key=${api_key}`,
  upcomingMovies: `${url}/movie/upcoming?api_key=${api_key}`,

  airingTodayTVShows: `${url}/tv/airing_today?api_key=${api_key}`,
  onTheAirTVShows: `${url}/tv/on_the_air?api_key=${api_key}`,
  popularTVShows: `${url}/tv/popular?api_key=${api_key}`,
  topRatedTVShows: `${url}/tv/top_rated?api_key=${api_key}`,
};

export function getPosters(type) {
  return axios.get(endpoints[type]).then((response) => {
    return response.data.results;
  });
}

export function getDetails(type, id) {
  return axios
    .get(`${url}/${type}/${id}?api_key=${api_key}&append_to_response=videos`)
    .then((response) => {
      return response.data;
    });
}

export function getSearchResults(query) {
  return axios
    .get(`${url}/search/multi?api_key=${api_key}&query=${query}`)
    .then((response) => {
      return response.data;
    });
}
