import epics from './index';
import { Library } from '../actions';
import { createTestScheduler, hot } from '../utils/TestUtils';
import { Observable } from 'rxjs';

let scheduler;
const book1 = { id: '1234'};
const book2 = { id: '2345'};
const book3 = { id: '3456'};

beforeEach(() => {
  scheduler = createTestScheduler();
});

describe('library epics', () => {

  it('add books to library', () => {
    const bookApi = {
      addBook: (book) => (book === book3 ? Observable.throw(): Observable.of(book))
        .delay(30, scheduler),
    };

    const actions = {
      a: Library.addBook(book1),
      b: Library.addBook(book2),
      c: Library.addBook(book3),
      d: Library.onBookAdded(book1),
      e: Library.onBookAdded(book2),
      f: Library.onBookError(book3),
    };
    const inputMarble =  '-a-b----c';
    const outputMarble = '----d-e-f';

    const action$ = hot(scheduler, inputMarble, actions);
    const outputAction$ = epics(action$, null, { bookApi, scheduler });

    scheduler.expectObservable(outputAction$).toBe(outputMarble, actions);
    scheduler.flush();
  });

  it('remove books from the library', () => {
    const bookApi = {
      removeBook: (book) => (book === book2 ? Observable.throw(): Observable.of(book))
        .delay(30, scheduler),
    };

    const actions = {
      a: Library.removeBook(book1),
      b: Library.removeBook(book2),
      c: Library.removeBook(book3),
      d: Library.onBookRemoved(book1),
      e: Library.onBookError(book2),
      f: Library.onBookRemoved(book3),
    };
    const inputMarble =  '-a-b--c---';
    const outputMarble = '---ed----f';

    const action$ = hot(scheduler, inputMarble, actions);
    const outputAction$ = epics(action$, null, { bookApi, scheduler });

    scheduler.expectObservable(outputAction$).toBe(outputMarble, actions);
    scheduler.flush();
  });

});