import {
  FETCH_MOVIES_BEGIN, FETCH_MOVIES_FAILURE,
  FETCH_MOVIES_SUCCESS, LOG_SEARCH,
  UPDATE_GENRE,
  UPDATE_TITLE
} from "../actions/SearchFormActionTypes";

const initialState = {
  title: '',
  genre: '',
  searchHistory: [],
  items: [],
  loading: false,
  error: null
};

export const SearchFormReducer = (state = initialState, action) => {
  console.log('reducer running', action);
  switch(action.type){
    case UPDATE_TITLE:
      return Object.assign({}, state, {
        title: action.title,
      });
    case UPDATE_GENRE:
      return Object.assign({}, state, {
        genre: action.genre,
      });
    case LOG_SEARCH:
      // Update search history.
      return Object.assign({}, state, {
        searchHistory: [...state.searchHistory, {searchedTitle: action.title, searchedGenre: action.genre}]
      });
    case FETCH_MOVIES_BEGIN:
      // Mark state as loading so frontend knows to display loading wheel.
      // Reset any errors when starting new fetch.
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case FETCH_MOVIES_SUCCESS:
      // When finished, set loading to false.
      // We update the items with what was received.
      return Object.assign({}, state, {
        loading: false,
        items: action.payload.movies
      });
    case FETCH_MOVIES_FAILURE:
      // Set loading to false and save error so we can display it.
      // Also, we reset items list upon error encounter.
      return Object.assign({}, state, {
        loading: false,
        error: action.payload.error.message,
        items: []
      });
    default:
      return state
  }
};