import * as actions from '../SearchFormActions'
import * as types from '../SearchFormActionTypes'

describe('actions', () => {
  it('should create an action to update the title field', () => {
    const text = 'Rainman';
    const expectedAction = {
      type: types.UPDATE_TITLE,
      title: text
    };
    expect(actions.updateTitle(text)).toEqual(expectedAction)
  });
  it('should create an action to update the genre field', () => {
    const text = 'Horror';
    const expectedAction = {
      type: types.UPDATE_GENRE,
      genre: text
    };
    expect(actions.updateGenre(text)).toEqual(expectedAction)
  });
  it('should create an action to log the title and genre fields', () => {
    const expectedAction = {
      type: types.LOG_SEARCH,
    };
    expect(actions.logSearch()).toEqual(expectedAction)
  });
});