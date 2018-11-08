import { SUBMIT_SEARCH, UPDATE_GENRE, UPDATE_TITLE } from '../actions/SearchFormActionTypes';

const initialState = {
  title: '',
  genre: '',
  submittedTitle: '',
  submittedGenre: ''
}

export const SearchFormReducer = (state = initialState, action) => {
  console.log('reducer running', action)
  switch (action.type) {
    case UPDATE_TITLE:
      return Object.assign({}, state, {
        title: action.title
      })
    case UPDATE_GENRE:
      return Object.assign({}, state, {
        genre: action.genre
      })
    case SUBMIT_SEARCH:
      return Object.assign({}, state, {
        submittedTitle: state.title,
        submittedGenre: state.genre
      })
    default:
      return state
  }
}
