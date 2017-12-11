import React, {Component} from 'react';
import {Modal, Button, Label, Image} from 'react-bootstrap';

import missingBookCover from '../missingBookCover.jpeg';

const itemList = (items) => {
  if (!items) return null;

  return items.map((item, index) => <span key={index}><Label bsStyle="primary">{item}</Label>&nbsp;</span>);
};

class BookDetail extends Component {

  render() {
    const {book, onClose} = this.props;
    const {volumeInfo: volume, searchInfo: info} = book;
    const {title, imageLinks, authors, categories, description, pageCount, publisher, publishedDate} = volume;

    return (
      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image style={{float: 'left', minWidth: '128px', height: '190px', marginRight: '1em', marginBottom: '1em'}}
                 thumbnail
                 src={imageLinks ? imageLinks.thumbnail : missingBookCover} alt={title}/>
          <div>Authors: {itemList(authors)}</div>
          <div>Categories: {itemList(categories)}</div>
          <hr/>
          <div>{description}</div>
          <hr/>
          <div>Pages <Label bsStyle="primary">{pageCount}</Label></div>
          <div>Publisher <Label bsStyle="success">{publisher}</Label></div>
          <div>Published Date <Label>{publishedDate}</Label></div>
          <hr/>
          <div>{info && info.textSnippet}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default BookDetail;
