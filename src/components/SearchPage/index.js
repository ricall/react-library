import React  from 'react';
import { connect } from 'react-redux';
import { Search, Library } from '../../actions/index';
import { libraryHelperFactory } from '../../utils/LibraryUtils';

import SearchForm from './SearchForm';
import SearchResults from './SearchResults';


const SearchPage = (props) =>
  <div>
    <SearchForm {...props} />
    <SearchResults {...props} />
  </div>;

const mapState = (state) => {
  const { isBookInLibrary } = libraryHelperFactory(state.library);
  const { search } = state;
  return { ...search, isBookInLibrary };
};
const actions = {
  search: Search.search,
  clearResults: () => Search.onSearchResult(undefined),
  updateSearchStatus: Search.updateSearchStatus,
  addBook: Library.addBook,
  removeBook: Library.removeBook
};

export default connect(mapState, actions)(SearchPage);