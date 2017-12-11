import React, { Component }  from 'react';

const MissingBook = ({title, authors}) => {
  return <div className="missingBook" width="128" height="190">
    <div className="title">{title}</div>
    <div className="author">{authors && authors.map((author, index) => [
      author,
      <br key={index}/>
    ])}
    </div>
  </div>
};

class Book extends Component {

  render() {
    const { book, onSelect } = this.props;
    if (!book) {
      return <div key='empty' className={'book-wrapper'}/>
    }

    const { id, volumeInfo : volume } = this.props.book;
    const {
      title,
      // subtitle,
      // description,
      authors,
      // publisher,
      // publishDate,
      imageLinks,
      // industryIdentifiers,
      // pageCount,
      // categories,
      // canonicalVolumeLink
    } = volume;

    return <div key={id} className="book-wrapper" onClick={() => onSelect(book)}>
      { imageLinks && <img src={imageLinks.thumbnail} width="128" height="190" alt={title} /> }
      { !imageLinks && <MissingBook title={title} authors={authors} /> }
    </div>;

/*    <li key={id} className="book">
      <img className="front" src={(imageLinks && imageLinks.thumbnail) || missingBookCover} alt={title}/>
        <div className="back">
          <div className="p10">
            <div className="rating star-4">
              <ol>
                <li>✰</li>
                <li>✰</li>
                <li>✰</li>
                <li>✰</li>
                <li>✰</li>
              </ol>
            </div>
            <dl>
              { authors && [
                <dt key="author1">Author(s):</dt>,
                <dd key="author2">{authors.join(', ')}</dd>
              ]}
              { categories && [
                  <dt key="category1">Topic:</dt>,
                  <dd key="category2">{categories.join(', ')}</dd>
              ]}
              <dt>Publisher:</dt><dd>{publisher}</dd>
              <dt>Year:</dt><dd>{publishDate}</dd>
              <dt>Page Count:</dt><dd>{pageCount}</dd>
              { industryIdentifiers && [
                <dt key="identifier1">Identifiers</dt>,
                <dd key="identifier2">{industryIdentifiers
                  .map(id => id.identifier)
                    .join(', ')}</dd>
              ]}
            </dl>
            <p className="description">
              { description }
            </p>
            {canonicalVolumeLink && <a href={canonicalVolumeLink}>Visit website</a>}
          </div>
        </div>
    </li>;*/
  }
}

export default Book;