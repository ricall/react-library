import { Observable } from 'rxjs';

export default {
  addBook: (book) => Observable.of(book)
    .delay(100),

  removeBook: (book) => Observable.of(book)
    .delay(200),
}