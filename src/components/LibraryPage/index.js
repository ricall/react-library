import React from 'react';
import { connect } from 'react-redux';

import { Library } from "../../actions";
import LibrarySearch from './LibrarySearch';
import BookShelf from "../Bookshelf/index";
import BookDetail from './BookDetail';

export const LibraryPage = (props) => {
  const { books, bookDetails, searchResults, onSelect } = props;
  return <div>
    <LibrarySearch {...props}/>
    { bookDetails && <BookDetail book={bookDetails} onClose={() => onSelect(null)}/> }
    <BookShelf books={searchResults ? searchResults : Object.values(books)} onSelect={onSelect}/>
    {/*<BookList {...props}/>*/}
  </div>;
}

const mapState = (state) => ({ ...state.library });
const actions = {
  removeBook: Library.removeBook,
  onSearchTextChanged: Library.onSearchTextChanged,
  onLibraryViewChanged: Library.onLibraryViewChanged,
  onSearch: Library.onLibrarySearch,
  onSelect: Library.showBookDetails,
};

export default connect(mapState, actions)(LibraryPage);