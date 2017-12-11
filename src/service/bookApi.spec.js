import api from './bookApi';

const book = { id: '1234' };

it('should add a book to the library', () => {
  expect.assertions(1);
  return api.addBook(book).toPromise()
    .then(b => {
      expect(b).toBe(book);
    });
});

it('should remove a book from the library', () => {
  expect.assertions(1);
  return api.removeBook(book).toPromise()
    .then(b => {
      expect(b).toBe(book);
    });
});