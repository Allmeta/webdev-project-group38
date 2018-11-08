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
  it('should create an action to log the title', () => {
    const expectedAction = {
      type: types.LOG_SEARCH,
    };
    expect(actions.logSearch()).toEqual(expectedAction)
  });
});