import React, { Component } from 'react';
import Book from './Book';
import './bookshelf.css';

class BookShelf extends Component {
  render() {
    const { books, onSelect } = this.props;
    return (
      <div className="bookshelf--frame">
        {!books.length && <Book />}
        {books.map((book, index) => <Book key={index} book={book} onSelect={onSelect}/>)}
      </div>
    );
  }
}

export default BookShelf;
