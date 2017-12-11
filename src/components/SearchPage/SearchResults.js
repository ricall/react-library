import React from 'react';
import BookPanel from '../BookPreview';

const SearchResults = (props) => {
  const { results } = props;
  if (results === undefined) {
    return null;
  }
  if (results.length === 0) {
    return <p>No results found</p>;
  }
  return results.map((book, index) =>
    <BookPanel key={index} book={book} {...props} />
  );
};

export default SearchResults;
