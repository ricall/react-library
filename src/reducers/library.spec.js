import reducer, { initialState } from './library';
import { Library } from "../actions";
import localStorage from 'local-storage';

const book1 = { id: '1234' };

it('has the expected initial state', () => {
  expect(initialState).toEqual({
    books: {},
    updating: false,
    search: '',
    view: 'bookshelf',
    bookDetails: null,
  });
});

it('reduces undefined to initial state', () => {
  expect(reducer(undefined)).toEqual(initialState);
});

[Library.addBook(book1), Library.removeBook(book1)].forEach(action => {
  it(`handles the ${action.type} action`, () => {
    expect(reducer(initialState, action)).toEqual({ ...initialState, updating: true });
  })
});

it('handles the onBookAdded action', () => {
  expect(reducer({ ...initialState, updating: true}, Library.onBookAdded(book1)))
    .toEqual({ ...initialState, books: { '1234': book1 }});
});

it('handles the onBookRemoved action', () => {
  expect(reducer({ ...initialState, books: { '1234': book1 }, updating: true}, Library.onBookRemoved(book1)))
    .toEqual(initialState);
});

it('handles the onBookError action', () => {
  expect(reducer({ ...initialState, updating: true}, Library.onBookError())).toEqual(initialState);
});

it('handles the loadLibrary action', () => {
  const newState = ({ ...initialState, books: { '1234': book1 }});
  jest.mock('local-storage');
  localStorage.get = jest.fn(() => newState);

  expect(reducer(initialState, Library.loadLibrary())).toEqual(newState);
  expect(localStorage.get).toBeCalledWith('library');
});

it('handles the onSaveLibrary action', () => {
  const newState = ({ ...initialState, books: { '1234': book1 }});
  jest.mock('local-storage');
  localStorage.set = jest.fn();

  expect(reducer(newState, Library.onSaveLibrary())).toEqual(newState);
  expect(localStorage.set).toBeCalledWith('library', newState);

});
