import { libraryHelperFactory, validateISBN } from './LibraryUtils';

const book = { id: '1234' };
const library = { books: { 1234: book }};

const libraryHelper = libraryHelperFactory(library);

[
  { description: 'returns false for an undefined book', book: undefined, inLibrary: false },
  { description: 'returns false for a null book', book: null, inLibrary: false },
  { description: 'returns true for a book in the library', book, inLibrary: true },
  { description: 'returns false for a book not in the library', book: { id: '5678' }, inLibrary: false },
].forEach(( { description, book, inLibrary }) => {
  it(description, () => {
    expect(libraryHelper.isBookInLibrary(book)).toEqual(inLibrary);
  });
});


[
  { isbn: '9780330422307', valid: true },
  { isbn: '6291041500213', valid: true },
  { isbn: '6291041500210', valid: false },
  { isbn: '6291041500211', valid: false },
  { isbn: '6291041500212', valid: false },
  { isbn: '6291041500214', valid: false },
  { isbn: '6291041500215', valid: false },
  { isbn: '6291041500216', valid: false },
  { isbn: '6291041500217', valid: false },
  { isbn: '6291041500218', valid: false },
  { isbn: '6291041500219', valid: false },
].forEach(({isbn, valid}) => {
  it(`validates ISBN ${isbn} is ${valid ? '' : 'in'}valid`, () => {
    expect(validateISBN(isbn)).toEqual(valid);
  });
});