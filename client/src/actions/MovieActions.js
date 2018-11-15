import {
  FETCH_MOVIES_BEGIN, FETCH_MOVIES_FAILURE,
  FETCH_MOVIES_SUCCESS, LOG_SEARCH,
  UPDATE_TITLE, UPDATE_PAGE, FETCH_NEXT_PAGE_FAILURE
} from './MovieActionTypes'
import fetch from 'cross-fetch'
import { BASE_URL } from '../api/constants'

export function updateTitle (title) {
  return { type: UPDATE_TITLE, title }
}

export function updatePage () {
  return { type: UPDATE_PAGE }
}

export function logSearch (title) {
  return {
    type: LOG_SEARCH,
    title: title
  }
}

export function fetchMoviesBegin () {
  return { type: FETCH_MOVIES_BEGIN }
}

export function fetchMoviesSuccess (movies) {
  return {
    type: FETCH_MOVIES_SUCCESS,
    payload: { movies }
  }
}

export function fetchMoviesFailure (error) {
  return {
    type: FETCH_MOVIES_FAILURE,
    payload: { error }
  }
}

export function fetchNextPageFailure (error) {
  console.log(error.message)
  return {
    type: FETCH_NEXT_PAGE_FAILURE,
    payload: 'No more movies to show!'
  }
}


export function fetchNextPage(title, page){
  let fetchURL = ''
  console.log(BASE_URL + '/movies?page=' + page + '&title=')
  if(title === undefined || title === ''){
    fetchURL = BASE_URL + '/movies?page=' + page + '&title='
  }
  fetchURL = BASE_URL + '/movies?page=' + page + '&search=' + title;
  return dispatch => {
    dispatch(fetchMoviesBegin())
    return fetch(fetchURL)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchMoviesSuccess(json))
        return json
      })
      .catch(error => dispatch(fetchNextPageFailure(error)))
  }
}

// Async action creator for fetching movies.
export function fetchMovies (title) {
  let fetchURL = ''
  let page = 1
  if(title === undefined || title === ''){
    fetchURL = BASE_URL + '/movies?page=' + page + '&title='
  }
  else{
    fetchURL = BASE_URL + '/movies?page=' + page + '&search=' + title
  }
  return dispatch => {
    dispatch(fetchMoviesBegin())
    return fetch(fetchURL)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchMoviesSuccess(json))
        return json
      })
      .catch(error => dispatch(fetchMoviesFailure(error)))
  }
}

// Handle HTTP errors since fetch won't.
function handleErrors (response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}
