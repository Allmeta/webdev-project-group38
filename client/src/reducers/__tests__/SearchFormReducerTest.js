import {SearchFormReducer} from '../SearchFormReducer';
import {UPDATE_GENRE, UPDATE_TITLE} from "../../actions/SearchFormActionTypes";

describe('search form reducer', () => {
  it('should return the initial state', () => {
    expect(SearchFormReducer(undefined, {})).toEqual(
      {
      title: '',
      genre: '',
      submittedTitle: '',
      submittedGenre: '',
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

  it('should handle UPDATE_GENRE', () => {
    expect(
      SearchFormReducer({}, {
        type: UPDATE_GENRE,
        genre: 'Thriller'
      })
    ).toEqual(
      {
        genre: 'Thriller'
      }
    )
    expect(
      SearchFormReducer({
        genre: 'Thriller'
      }, {
        type: UPDATE_GENRE,
        genre: 'Horror'
      })
    ).toEqual(
      {
        genre: 'Horror'
      }
    )
  })
})