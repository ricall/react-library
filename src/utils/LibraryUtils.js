export const libraryHelperFactory = (library) => ({
  isBookInLibrary: (book) => {
    if (!book) {
      return false;
    }
    return Object.keys(library.books).includes(book.id);
  },
});

export const validateISBN = (isbn) => {
  if (!isbn) {
    return false;
  }
  const offset = isbn.length % 2 ? 0 : 1;
  return isbn.split('')
    .map((d, index) => Number(d) * (((index + offset) % 2) ? 3 : 1))
    .reduce((sum, value) => sum + value, 0) % 10 === 0;
};