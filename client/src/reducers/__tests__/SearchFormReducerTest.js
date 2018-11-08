import {SearchFormReducer} from '../SearchFormReducer';
import {LOG_SEARCH, UPDATE_GENRE, UPDATE_TITLE} from "../../actions/SearchFormActionTypes";

describe('search form reducer', () => {
  it('should return the initial state', () => {
    expect(SearchFormReducer(undefined, {})).toEqual(
      {
        title: '',
        searchHistory: [],
        items: [],
        loading: false,
        error: null
      }
    )
  })

  it('should handle UPDATE_TITLE', () => {
    expect(
      SearchFormReducer({}, {
        type: UPDATE_TITLE,
        title: 'Batman'
      })
    ).toEqual(
      {
        title: 'Batman',
      }
    )
    expect(
      SearchFormReducer(
        {
          title: 'Batman',
        }
        ,
        {
          type: UPDATE_TITLE,
          title: 'Spiderman'
        }
      )
    ).toEqual(
      {
        title: 'Spiderman'
      })
  })

  it('should handle LOG_SEARCH', () => {
    expect(
      SearchFormReducer({searchHistory: []}, {
        type: LOG_SEARCH,
        title: 'Avengers'
      })
    ).toEqual(
      { searchHistory: [{
          searchedTitle: 'Avengers'
      }]
      }
    )
  })
})