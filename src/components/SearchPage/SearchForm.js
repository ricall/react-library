import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import {
  InputGroup,
  Panel,
  Form,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  ButtonToolbar,
  Button,
  Glyphicon
} from 'react-bootstrap';
import Quagga from 'quagga';

import { validateISBN } from '../../utils/LibraryUtils';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {...props.query, searchStatus: ''};
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({ [name]: value });
  };

  handleClear = () => {
    this.props.clearResults();
    this.setState({ inauthor: '', intitle: '', text: '', isbn: '' });
    this.titleInput.focus();
  };

  handleSearch = (event) => {
    event.preventDefault();
    this.props.updateSearchStatus("Searching...");

    this.searchImpl(false)
  };

  searchImpl = (autoAdd) => {
    this.props.clearResults();

    let { inauthor, intitle, text, isbn } = this.state;
    if (isbn) {
      inauthor = intitle = text = '';
    }
    this.props.search({
      query: {
        inauthor,
        intitle,
        text,
        isbn,
      },
      autoAdd,
    });
  };

  handleISBNValidation = (value) => validateISBN(value) ? 'success' : 'warning';

  handleFileUpload = ({ target }) => {
    console.log('File Upload', target);
    if (target.files.length < 1) {
      return;
    }
    const file = target.files[0];
    const src = URL.createObjectURL(file);

    this.handleClear();

    Quagga.decodeSingle({
      inputStream: {
        size: 800
      },
      locator:
      {
        patchSize:'medium',
        halfSample:false
      },
      numOfWorkers:1,
      decoder:{
        readers: [{
          format: 'ean_reader',
          config:{}
        }]
      },
      locate:true,
      src,
    }, this.onDetected);
  };

  onDetected = (barcode) => {
    console.log(barcode);
    if (barcode && barcode.codeResult && barcode.codeResult.code) {
      this.props.updateSearchStatus('Searching for book');
      this.setState({ isbn: barcode.codeResult.code });
      this.searchImpl(true);
    } else {
      this.props.updateSearchStatus('Unable to read barcode');
    }
  };

  render() {
    const { isSearching, searchStatus } = this.props;

    return <Panel bsStyle="success">
      <Form horizontal onSubmit={this.handleSearch}>
        <FormGroup controlId="intitle">
          <Col componentClass={ControlLabel} sm={2}>Title</Col>
          <Col sm={10}>
            <FormControl
              autoFocus
              ref={input => this.titleInput = findDOMNode(input)}
              name="intitle"
              type="text"
              value={this.state.intitle}
              placeholder="Enter Title"
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="inauthor">
          <Col componentClass={ControlLabel} sm={2}>Author</Col>
          <Col sm={10}>
            <FormControl
              name="inauthor"
              type="text"
              value={this.state.inauthor}
              placeholder="Enter Author"
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="text">
          <Col componentClass={ControlLabel} sm={2}>Text</Col>
          <Col sm={10}>
            <FormControl
              name="text"
              type="text"
              value={this.state.text}
              placeholder="Enter text to search for"
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="isbn" validationState={this.handleISBNValidation(this.state.isbn)}>
          <Col componentClass={ControlLabel} sm={2}>ISBN</Col>
          <Col sm={10}>
            <InputGroup>
              <InputGroup.Addon onClick={ () => this.refs.fileUpload.click() }>
                <Glyphicon glyph="barcode"/>
              </InputGroup.Addon>
              <FormControl
                name="isbn"
                type="number"
                pattern="\d*"
                value={this.state.isbn}
                placeholder="Enter ISBN"
                onChange={this.handleChange}
              />
            </InputGroup>
          </Col>
        </FormGroup>
        <input
          style={{ visibility: 'hidden', height: 0 }}
          ref="fileUpload"
          type="file"
          accept="image/*;capture=camera"
          onChange={this.handleFileUpload}
        />
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <ButtonToolbar>
              { searchStatus }
              <Button className="pull-right" type="submit" bsStyle="primary" disabled={ isSearching }>Search</Button>
              <Button className="pull-right" bsStyle="default" onClick={this.handleClear}>Clear</Button>
            </ButtonToolbar>
          </Col>
        </FormGroup>
      </Form>
    </Panel>;
  }
}

export default SearchForm;