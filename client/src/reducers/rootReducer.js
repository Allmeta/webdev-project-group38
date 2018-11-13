import { combineReducers } from 'redux'
import { SearchFormReducer } from './SearchFormReducer'
import { FilterFormReducer } from './FilterFormReducer'

export default combineReducers({ SearchFormReducer, FilterFormReducer })
