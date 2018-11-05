/*
 * action types
 */

export const UPDATE_TITLE = 'UPDATE_TITLE';
export const UPDATE_GENRE = 'UPDATE_GENRE';
export const SUBMIT_SEARCH = 'SUBMIT_SEARCH';

/*
 * action functions
 */

export function updateTitle(title) {
  return { type: UPDATE_TITLE, title }
}

export function updateGenre(genre) {
  return { type: UPDATE_GENRE, genre }
}

export function submitSearch() {
  return { type: SUBMIT_SEARCH }
}