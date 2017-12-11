import reducer, { initialState } from "./search";
import { Search } from '../actions';

it('has the expected initial state', () => {
  expect(initialState).toEqual({
    query: {
      inauthor: 'Alan Dean Foster',
      intitle: 'Alien',
      text: '',
      isbn: '',
    },
    searching: false,
    searchStatus: '',
    results: undefined,
  });
});

it(`reduces undefined into initialState`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it('handles search actions', () => {
  const query = { isbn: '1234567890' };

  expect(reducer(initialState, Search.search(query))).toEqual({
    ...initialState,
    query,
    searching: true,
  });
});

it('handles onSearchResult actions', () => {
  const results = [ { id: '1234' }, { id: '2345' }];
  expect(reducer({...initialState, searching: true}, Search.onSearchResult(results))).toEqual({
    ...initialState,
    searching: false,
    results,
  });
});

it('handles onSearchError actions', () => {
  expect(reducer({...initialState, searching: true, results: []}, Search.onSearchError())).toEqual({
    ...initialState,
    searching: false,
    results: undefined,
  })
});

it('handles updateSearchStatus actions', () => {
  expect(reducer(initialState, Search.updateSearchStatus('test'))).toEqual({
    ...initialState,
    searchStatus: 'test',
  });
});