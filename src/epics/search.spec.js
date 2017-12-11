import epics from './index';
import { Search, Library } from '../actions';
import { createTestScheduler, hot } from '../utils/TestUtils';
import { Observable } from 'rxjs';

let scheduler;

beforeEach(() => {
  scheduler = createTestScheduler();
});

const dependencies = {
  updateStatusDelay: 30, // change the delay to 30ms so that our diagrams are simple
};

describe('status epics', () => {

  it("ensure clear status is sent after 30ms delay", () => {
    const actions = {
      a: Search.updateSearchStatus("STATUS1"),
      b: Search.updateSearchStatus("STATUS2"),
      c: Search.updateSearchStatus(""),
    };
    const inputMarble =  '-a--b---c----a---|';
    const outputMarble = '-------c--------c|';

    const action$ = hot(scheduler, inputMarble, actions);
    const outputAction$ = epics(action$, null, { ...dependencies, scheduler });

    scheduler.expectObservable(outputAction$).toBe(outputMarble, actions);
    scheduler.flush();
  });

  it("ensure that search returns some data", () => {
    const query = { isbn: '1234567890' };
    const books = [ { id: '1234' }];

    const googleBookApi = {
      search: () => Observable.of({ items: books })
        .delay(30, scheduler),
    };

    // Define marbles
    const actions = {
      a: Search.search({ query }),
      b: Search.onSearchResult(books),
    };
    const inputMarble =  '-a----a-a---';
    const outputMarble = '----b------b';

    const action$ = hot(scheduler, inputMarble, actions);
    const outputAction$ = epics(action$, null, { googleBookApi });

    scheduler.expectObservable(outputAction$).toBe(outputMarble, actions);
    scheduler.flush();
  });

  it('verifies that search with auto add works', () => {
    const query1 = { isbn: '1234567890' };
    const response1 = [{ id: '5678' }, { id: '6789' }];
    const query2 = { isbn: '0123456789' };
    const response2 = [{ id: '4567' }];

    const googleBookApi = {
      search: (query) => Observable.of((query === query1) ? { items: response1 } : { items: response2 })
        .delay(30, scheduler),
    };

    // Define marbles
    const actions = {
      a: Search.search({ query: query1, autoAdd: true }),
      b: Search.search({ query: query2, autoAdd: true }),
      c: Search.onSearchResult(response1),
      d: Search.onSearchResult(response2),
      e: Library.addBook(response2[0]),
    };
    const inputMarble =  '-a----b--b-';
    const outputMarble = '----c-------(de)';

    const action$ = hot(scheduler, inputMarble, actions);
    const outputAction$ = epics(action$, null, { googleBookApi });

    scheduler.expectObservable(outputAction$).toBe(outputMarble, actions);
    scheduler.flush();
  });

  it("ensure that search handles errors", () => {
    const query = { isbn: '1234567890' };
    const books = [ { id: '1234' }];

    const googleBookApi = {
      search: (query) => (query ? Observable.of({ items: books }) : Observable.throw())
        .delay(30, scheduler),
    };

    // Define marbles
    const actions = {
      a: Search.search({ query: null }),
      b: Search.search({ query }),
      c: Search.onSearchError(),
      d: Search.onSearchResult(books),
    };
    const inputMarble =  '-a----b-b---';
    const outputMarble = '-c---------d';

    const action$ = hot(scheduler, inputMarble, actions);
    const outputAction$ = epics(action$, null, { googleBookApi });

    scheduler.expectObservable(outputAction$).toBe(outputMarble, actions);
    scheduler.flush();
  });

});

