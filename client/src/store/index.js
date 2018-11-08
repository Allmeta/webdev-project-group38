import { createStore, applyMiddleware, compose } from 'redux'
import { SearchFormReducer } from "../reducers/SearchFormReducer";
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(SearchFormReducer, composeEnhancers(
  applyMiddleware(thunk)
));

export default store;