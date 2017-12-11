import { search } from './libraryService';

const book1 = {
  volumeInfo: {
    title: 'title1',
    subtitle: 'subtitle1',
    description: 'description1',
    authors: ['author1', 'author1.1'],
  },
  searchInfo: {
    textSnippet: 'textSnippet1 - with SOME TEXT here',
  },
};

const books = [book1];

it('finds a book in the library', () => {
  expect(search(books, 'some text')).toEqual([book1]);
});