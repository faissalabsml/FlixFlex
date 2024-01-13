import axios from "axios";

const api_key = import.meta.env.VITE_TMDB_KEY;

const url = "https://api.themoviedb.org/3";

const endpoints = {
  popularMovies: `${url}/movie/popular?api_key=${api_key}`,
  popularShows: `${url}/tv/popular?api_key=${api_key}`,
};

export function getPosters(type) {
  return axios.get(endpoints[type]).then((response) => {
    return response.data.results;
  });
}

export function getDetails(id) {
  return axios
    .get(`${url}/movie/${id}?api_key=${api_key}&append_to_response=videos`)
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

export default endpoints;
