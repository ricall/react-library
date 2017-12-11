import { createReducer } from 'redux-act';
import { Search } from '../actions';

export const initialState = {
  query: {
    intitle: 'Alien',
    inauthor: 'Alan Dean Foster',
    text: '',
    isbn: '',
  },
  searching: false,
  searchStatus: '',
  results: undefined,
};

export default createReducer({
  [Search.search]: (state, query) => ({ ...state, query, searching: true }),
  [Search.onSearchResult]: (state, results) => ({ ...state, searching: false, results }),
  [Search.onSearchError]: (state, error) => ({ ...state, searching: false, results: undefined }),
  [Search.updateSearchStatus]: (state, searchStatus) => ({ ...state, searchStatus }),
}, initialState);
