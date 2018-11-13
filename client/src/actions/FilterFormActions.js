import {
  UPDATE_FILTER_QUERY
} from './FilterFormActionTypes'

export function updateFilterQuery (filterquery) {
  return {
    type: UPDATE_FILTER_QUERY,
    payload: filterquery
  }
}
