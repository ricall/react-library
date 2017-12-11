import React, { Component }  from 'react';
import { Button, Panel, Label, Image, Media } from 'react-bootstrap';
import missingBookCover from './missingBookCover.jpeg'

class BookPreview extends Component {

  bookTitle() {
    const { book, addBook, removeBook, isBookInLibrary } = this.props;
    const { title, subtitle } = book.volumeInfo;
    const bookExists = isBookInLibrary(book);

    return <span>{ title }
      { subtitle && <span> ({subtitle})</span> }
      <span pullright="true">
        { !bookExists && <Button onClick={() => addBook(book)}>Add</Button>}
        { bookExists && <Button onClick={() => removeBook(book)}>Remove</Button>}
      </span>
    </span>;
  }

  itemList(items) {
    if (!items) return null;

    return items.map((item, index) => <span key={index}><Label bsStyle="primary">{item}</Label>&nbsp;</span>);
  }

  render() {
    const { volumeInfo: volume, searchInfo: info } = this.props.book;

    return <Panel header={this.bookTitle()} bsStyle="info">
      <Media>
        <Media.Left align="top">
          <Image style={{minWidth:'129px',height:'210px'}} thumbnail
                 src={volume.imageLinks ? volume.imageLinks.thumbnail : missingBookCover} alt={volume.title} />
        </Media.Left>
        <Media.Body>
          <div>Authors: {this.itemList(volume.authors)}</div>
          <div>Categories: {this.itemList(volume.categories)}</div>
          <div>{volume.description}</div>
          <div>Pages <Label bsStyle="primary">{volume.pageCount}</Label></div>
          <div>Publisher <Label bsStyle="success">{volume.publisher}</Label></div>
          <div>Published Date <Label>{volume.publishedDate}</Label></div>
          { info && <div>{info.textSnippet}</div> }
        </Media.Body>
      </Media>
    </Panel>
  }
}

export default BookPreview;