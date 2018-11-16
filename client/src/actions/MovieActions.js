import {
  FETCH_MOVIES_BEGIN,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIES_SUCCESS,
  FETCH_NEXT_PAGE_FAILURE, FETCH_NEXT_PAGE_SUCCESS,
  LOG_SEARCH,
  UPDATE_PAGE,
  UPDATE_TITLE,
  UPDATE_FILTER_QUERY,
  EMPTY_FILTER_ITEMS,
  UPDATE_SORT_TOGGLE, POST_COMMENT_BEGIN, POST_COMMENT_FAILURE
} from './MovieActionTypes'
import fetch from 'cross-fetch'
import { BASE_URL } from '../api/constants'
import store from '../store/index'

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

export function fetchNextPageSuccess (movies) {
  return {
    type: FETCH_NEXT_PAGE_SUCCESS,
    payload: { movies }
  }
}

export function fetchNextPage (title) {
  let fetchURL = ''
  let page = store.getState().MovieReducer.nextPage
  if (title === undefined || title === '') {
    fetchURL = BASE_URL + '/movies?page=' + page + '&title='
  } else {
    fetchURL = BASE_URL + '/movies?page=' + page + '&search=' + title
  }
  return (dispatch, getState) => {
    dispatch(fetchMoviesBegin())
    return fetch(fetchURL)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchNextPageSuccess(json))
        return json
      })
      .catch(error => dispatch(fetchNextPageFailure(error)))
  }
}

// Async action creator for fetching movies.
export function fetchMovies (title) {
  let fetchURL = ''
  let page = 1
  if (title === undefined || title === '') {
    fetchURL = BASE_URL + '/movies?page=' + page + '&title='
  } else {
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

export function postCommentBegin () {
  return {
    type: POST_COMMENT_BEGIN,
  }
}

export function postCommentFailure (error) {
  return {
    type: POST_COMMENT_FAILURE,
    payload: error
  }
}

export function postComment (key, comment) {
  let fetchURL = BASE_URL + '/movies/reviews'
  let putObject = { "id": key, "review": comment }
  return dispatch => {
    dispatch(postCommentBegin())
    return fetch(fetchURL, { method: 'PUT', body: JSON.stringify(putObject), headers: { 'Content-Type': 'application/json' } })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(error => dispatch(postCommentFailure(error)))
  }
}

// Handle HTTP errors since fetch won't.
function handleErrors (response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

export function updateFilterQuery (filterquery) {
  return {
    type: UPDATE_FILTER_QUERY,
    payload: filterquery
  }
}

export function changeSortToggle () {
  return {
    type: UPDATE_SORT_TOGGLE
  }
}
export function emptyFilterItems () {
  return {
    type: EMPTY_FILTER_ITEMS
  }
}
