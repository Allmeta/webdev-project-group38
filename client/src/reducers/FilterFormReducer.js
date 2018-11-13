import {
  UPDATE_FILTER_QUERY
} from '../actions/FilterFormActionTypes'

const initialState = {
  filterQuery: ''
}

export const FilterFormReducer = (state = initialState, action) => {
  console.log('reducer running', action)
  switch (action.type) {
    case UPDATE_FILTER_QUERY:
      return Object.assign({}, state, {
        filterQuery: action.payload
      })
    default:
      return state
  }
}
