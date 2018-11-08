import {
  FETCH_MOVIES_BEGIN, FETCH_MOVIES_FAILURE,
  FETCH_MOVIES_SUCCESS, LOG_SEARCH,
  UPDATE_GENRE,
  UPDATE_TITLE
} from "./SearchFormActionTypes"
import fetch from 'cross-fetch'
import {BASE_URL} from "../api/constants";

export function updateTitle(title) {
  return { type: UPDATE_TITLE, title }
}

export function updateGenre(genre) {
  return { type: UPDATE_GENRE, genre }
}

export function logSearch(title, genre) {
  return {
    type: LOG_SEARCH,
    title: title,
    genre: genre
  }
}

export function fetchMoviesBegin() {
  return { type: FETCH_MOVIES_BEGIN }
}

export function fetchMoviesSuccess(movies) {
  return {
    type: FETCH_MOVIES_SUCCESS,
    payload: { movies }
  }
}

export function fetchMoviesFailure(error) {
  return {
    type: FETCH_MOVIES_FAILURE,
    payload: { error }
  }
}

// Async action creator for fetching movies.
export function fetchMovies(title, genre){
  return dispatch => {
    dispatch(fetchMoviesBegin());
    if (title === "" && genre === ""){
      return fetch(BASE_URL + "/movies")
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          dispatch(fetchMoviesSuccess(json));
          return json;
        })
        .catch(error => dispatch(fetchMoviesFailure(error)));
    }
    else if (title !== "" && genre === ""){
      return fetch(BASE_URL + "/movies?search=" + title)
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          dispatch(fetchMoviesSuccess(json));
          return json;
        })
        .catch(error => dispatch(fetchMoviesFailure(error)));
    }
    else if (genre !== "" && title === ""){
      dispatch(fetchMoviesFailure({message: "Invalid request"}));
    }
    else {
      dispatch(fetchMoviesFailure({message: "Invalid request"}));
    }
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}