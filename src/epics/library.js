import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Search, Library } from "../actions";

const updateMessageFor = (action) => {
  const { title } = action.payload.volumeInfo;
  if (action.type === Library.onBookAdded.toString()) {
    return `Added ${title} to library`;
  }
  return `Removed ${title} from library`;
};


const addBookEpic = (action$, store, { bookApi }) =>
  action$.ofType(Library.addBook)
    .mergeMap(action => bookApi.addBook(action.payload)
        .map(book => Library.onBookAdded(book))
        .catch(error => Observable.of(Library.onBookError(action.payload))));

const removeBookEpic = (action$, store, { bookApi }) =>
  action$.ofType(Library.removeBook)
    .mergeMap(action => bookApi.removeBook(action.payload)
      .map(book => Library.onBookRemoved(book))
      .catch(error => Observable.of(Library.onBookError(action.payload))));

const updateStatusEpic = (action$, store, { bookApi }) =>
  action$.ofType(Library.onBookAdded, Library.onBookRemoved)
    .mergeMap(action => Observable.of(Search.updateSearchStatus(updateMessageFor(action))));

const updateLibrary = (action$, store, { saveLibraryDelay, scheduler }) =>
  action$.ofType(Library.addBook, Library.removeBook)
    .switchMap(action => Observable.of(Library.onSaveLibrary())
      .delay(saveLibraryDelay, scheduler));

const updateSearchText = (action$, store, { librarySearchDelay, scheduler }) =>
  action$.ofType(Library.onSearchTextChanged)
    .switchMap(({ payload }) => Observable.of(Library.onLibrarySearch(payload))
        .delay(librarySearchDelay, scheduler));

export default combineEpics(addBookEpic, removeBookEpic, updateStatusEpic, updateLibrary, updateSearchText);
