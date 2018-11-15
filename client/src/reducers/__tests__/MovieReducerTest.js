import {MovieReducer} from '../MovieReducer';
import {LOG_SEARCH, UPDATE_GENRE, UPDATE_TITLE} from "../../actions/MovieActionTypes";

describe('search form reducer', () => {
  it('should return the initial state', () => {
    expect(MovieReducer(undefined, {})).toEqual(
      {
        title: '',
        searchHistory: [],
        items: [],
        loading: false,
        error: null,
        nextPage: 1
      }
    )
  })

  it('should handle UPDATE_TITLE', () => {
    expect(
      MovieReducer({}, {
        type: UPDATE_TITLE,
        title: 'Batman'
      })
    ).toEqual(
      {
        title: 'Batman',
      }
    )
    expect(
      MovieReducer(
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
      MovieReducer({searchHistory: []}, {
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