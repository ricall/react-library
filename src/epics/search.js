import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { Search, Library } from "../actions";

const addBookIfNeeded = (autoAdd, items) => ((autoAdd && items && items.length === 1)
    ? Observable.of(Library.addBook(items[0]))
    : Observable.never);

export const searchEpic = (action$, store, { googleBookApi }) =>
  action$.ofType(Search.search)
    .switchMap(({ payload }) =>
      googleBookApi.search(payload.query)
        .flatMap((results) =>
          Observable.concat(
            Observable.of(Search.onSearchResult(results.items ? results.items : [])),
            addBookIfNeeded(payload.autoAdd, results.items),
          ))
        .catch(error => Observable.of(Search.onSearchError(error))));

export const updateStatusEpic = (action$, store, { updateStatusDelay, scheduler }) =>
  action$.ofType(Search.updateSearchStatus)
    .switchMap(action => (action.payload ? Observable.of(action.payload) : Observable.empty())
        .delay(updateStatusDelay, scheduler)
        .map(text => Search.updateSearchStatus("")));

export default combineEpics(searchEpic, updateStatusEpic);
