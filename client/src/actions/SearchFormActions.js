import {SUBMIT_SEARCH, UPDATE_GENRE, UPDATE_TITLE} from "./SearchFormActionTypes";

export function updateTitle(title) {
  return { type: UPDATE_TITLE, title }
}

export function updateGenre(genre) {
  return { type: UPDATE_GENRE, genre }
}

export function submitSearch() {
  return { type: SUBMIT_SEARCH }
}