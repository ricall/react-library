import { createReducer } from 'redux-act';
import localStorage from 'local-storage';
import libraryService from '../service/libraryService';

import { Library } from "../actions";

export const initialState = {
  books: {},
  updating: false,
  search: '',
  view: 'bookshelf',
  bookDetails: null,
};

const handleBookAdded = (state, book) => {
  const books = { ...(state.books) };
  books[book.id] =  book;

  return { ...state, updating: false, books };
};

const handleBookRemoved = (state, book) => {
  const books = { ...(state.books) };
  delete books[book.id];

  return { ...state, updating: false, books };
};

const handleLoadLibrary = () => {
  const persistedState = localStorage.get('library');
  if (!persistedState) {
    return initialState;
  }
  return { ...initialState, ...persistedState }
};

const handleSaveLibrary = (state) => {
  localStorage.set('library', state);

  return state;
};

export default createReducer({
  [Library.addBook]: (state) => ({ ...state, updating: true }),
  [Library.onBookAdded]: handleBookAdded,
  [Library.removeBook]: (state) => ({ ...state, updating: true }),
  [Library.onBookRemoved]: handleBookRemoved,
  [Library.onBookError]: (state) => ({ ...state, updating: false }),
  [Library.loadLibrary]: handleLoadLibrary,
  [Library.onSaveLibrary]: handleSaveLibrary,
  [Library.onSearchTextChanged]: (state, search) => ({ ...state, search }),
  [Library.onLibraryViewChanged]: (state, view) => ({ ...state, view }),
  [Library.onLibrarySearch]: (state, search) => ({ ...state, searchResults: libraryService.search(state.books, search) }),
  [Library.showBookDetails]: (state, book) => ({ ...state, bookDetails: book }),
}, initialState);
