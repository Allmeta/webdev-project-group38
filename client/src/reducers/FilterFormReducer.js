import {
  UPDATE_FILTER_QUERY
} from '../actions/FilterFormActionTypes'
import store from '../store/index.js'
import SearchFormReducer from './SearchFormReducer'
const initialState = {
  filterQuery: ''
}

export const FilterFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FILTER_QUERY:
      return Object.assign({}, state, {
        filterQuery: action.payload
      })
    default:
      return state
  }
}
