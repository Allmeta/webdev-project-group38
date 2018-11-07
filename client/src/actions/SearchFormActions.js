import {
  FETCH_MOVIES_BEGIN, FETCH_MOVIES_FAILURE,
  FETCH_MOVIES_SUCCESS,
  SUBMIT_SEARCH,
  UPDATE_GENRE,
  UPDATE_TITLE
} from "./SearchFormActionTypes"
import fetch from 'cross-fetch'

export function updateTitle(title) {
  return { type: UPDATE_TITLE, title }
}

export function updateGenre(genre) {
  return { type: UPDATE_GENRE, genre }
}

export function submitSearch() {
  return { type: SUBMIT_SEARCH }
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

export function fetchMovies(){
  return dispatch => {
    dispatch(fetchMoviesBegin());
    return fetch("http://178.62.117.129:5025/api/movies?search=ant")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchMoviesSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchMoviesFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}