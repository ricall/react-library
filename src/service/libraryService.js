
const searchFor = (searchText) => (book) => {
  const { volumeInfo: volume, searchInfo: info } = book;
  const text = new RegExp(searchText, "i")
  if (volume) {
    const {title, subtitle, description, authors} = volume;

    if (title && title.match(text)) return true;
    if (subtitle && subtitle.match(text)) return true;
    if (description && description.match(text)) return true;
    if (authors && authors.find(author => author.match(text))) return true;
  }
  if (info) {
    const { textSnippet } = info;

    if (textSnippet && textSnippet.match(text)) return true;
  }
  return false;
};

export const search = (books, text) => {
  if (!text) {
    return undefined;
  }

  const searcher = searchFor(text);

  return Object.values(books)
    .filter(searcher);
};

export default {
  search,
}