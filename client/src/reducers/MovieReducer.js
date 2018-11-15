import {
  FETCH_MOVIES_BEGIN,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIES_SUCCESS,
  LOG_SEARCH,
  UPDATE_TITLE,
  UPDATE_PAGE, FETCH_NEXT_PAGE_FAILURE
} from '../actions/MovieActionTypes'

const initialState = {
  title: '',
  searchHistory: [],
  items: [],
  loading: false,
  error: null,
  nextPage: 1
}

export const MovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TITLE:
      return Object.assign({}, state, {
        title: action.title
      })
    case UPDATE_PAGE:
      return Object.assign({}, state, {
        nextPage: state.nextPage + 1
      })
    case LOG_SEARCH:
      // Update search history.
      return Object.assign({}, state, {
        searchHistory: [...state.searchHistory, { searchedTitle: action.title }]
      })
    case FETCH_MOVIES_BEGIN:
      // Mark state as loading so frontend knows to display loading wheel.
      // Reset any errors when starting new fetch.
      return Object.assign({}, state, {
        loading: true,
        error: null
      })
    case FETCH_MOVIES_SUCCESS:
      // When finished, set loading to false.
      // We update the items with what was received.
      return Object.assign({}, state, {
        loading: false,
        items: action.payload.movies
      })
    case FETCH_MOVIES_FAILURE:
      // Set loading to false and save error so we can display it.
      // Also, we reset items list upon error encounter.
      return Object.assign({}, state, {
        loading: false,
        error: action.payload.error.message,
        items: []
      })
    case FETCH_NEXT_PAGE_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload,
        nextPage: state.nextPage - 1
      })
    default:
      return state
  }
}
