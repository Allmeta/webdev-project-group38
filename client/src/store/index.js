import { createStore } from 'redux'
import { SearchFormReducer } from "../reducers/SearchFormReducer";

const store = createStore(SearchFormReducer);

export default store;