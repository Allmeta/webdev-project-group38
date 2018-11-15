import {
  FETCH_MOVIES_BEGIN,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIES_SUCCESS,
  LOG_SEARCH,
  UPDATE_TITLE,
  UPDATE_FILTER_QUERY,
  EMPTY_FILTER_ITEMS,
  UPDATE_SORT_TOGGLE
} from '../actions/SearchFormActionTypes'
import store from '../store/index.js'

const initialState = {
  title: '',
  searchHistory: [],
  items: [],
  loading: false,
  error: null,
  filterQuery: '',
  filterItems: [],
  toggleSort: 'grey'
}

export const SearchFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TITLE:
      return Object.assign({}, state, {
        title: action.title
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
        error: null,
        filterItems: [],
        filterQuery: ''
      })
    case FETCH_MOVIES_SUCCESS:
      // When finished, set loading to false.
      // We update the items with what was received.
      return Object.assign({}, state, {
        loading: false,
        items: action.payload.movies,
        filterItems: action.payload.movies,
        toggleSort: 'grey'
      })
    case FETCH_MOVIES_FAILURE:
      // Set loading to false and save error so we can display it.
      // Also, we reset items list upon error encounter.
      return Object.assign({}, state, {
        loading: false,
        error: action.payload.error.message,
        items: []
      })
    case UPDATE_FILTER_QUERY:
      var myJson = JSON.stringify([...state.items])
      var filteredJson = findInObject(JSON.parse(myJson), { title: action.payload })
      if ([...state.items].length === 0 || filteredJson === undefined) {
        return Object.assign({}, state, {
          filterQuery: action.payload,
          filterItems: []
        })
      } else {
        return Object.assign({}, state, {
          filterQuery: action.payload,
          filterItems: filteredJson
        })
      }
    case EMPTY_FILTER_ITEMS:
      return Object.assign({}, state, {
        filterQuery: ''
      })
    case UPDATE_SORT_TOGGLE:
      if (state.toggleSort === 'green' && state.filterItems.length > 0) {
        // Turn off sorting:
        let newState = [...state.filterItems]
        let randomOrder = newState.sort(function (a, b) { return Math.random() - 0.5 })
        return Object.assign({}, state, {
          toggleSort: 'grey',
          filterItems: randomOrder
        })
      } if (state.toggleSort === 'grey' && state.filterItems.length > 0) {
        console.log('The list should now be sorted!')
        // Sorting the filteredList:
        let data = [...state.filterItems]
        data.sort(function (a, b) {
          return a.rating.localeCompare(b.rating)
        })
        let sorted = data.sort().reverse()
        console.log(sorted, 'SortedList')
        // Sorter filteredItems, sett den til svart og returner det!!
        return Object.assign({}, state, {
          toggleSort: 'green',
          filterItems: sorted

        })
      } else {
        return Object.assign({}, state, {
          toggleSort: 'grey'
        })
      }
    default:
      return state
  }
}

function findInObject (myObject, myCriteria) {
  return myObject.filter(function (obj) {
    return Object.keys(myCriteria).every(function (c) {
      return obj[c].includes(myCriteria[c])
    })
  })
}
