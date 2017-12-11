import React, { Component } from 'react';
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
  Glyphicon,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap';

class LibrarySearch extends Component {

  constructor(props) {
    super(props);

    this.handleSearchChanged = this.handleSearchChanged.bind(this);
    this.handleViewChanged = this.handleViewChanged.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearchChanged(e) {
    const { value } = e.target;
    this.props.onSearchTextChanged(value);
  }

  handleViewChanged(view) {
    this.props.onLibraryViewChanged(view);
  }

  handleClear() {
    this.props.onSearchTextChanged('');
  }

  handleSearch(e) {
    e.preventDefault();

    this.props.onSearch(this.props.search);
  }

  render() {
    const { search, view } = this.props;

    return <Panel bsStyle="success">
      <Form horizontal onSubmit={this.handleSearch}>
        <FormGroup controlId="search">
          <Col componentClass={ControlLabel} sm={2}>Search</Col>
          <Col sm={10}>
            <InputGroup>
              <FormControl
              name="search"
              type="text"
              value={search}
              placeholder="Enter text to search for"
              onChange={this.handleSearchChanged}/>
              <InputGroup.Addon>
                <Glyphicon glyph="search"/>
              </InputGroup.Addon>
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup controlId="search">
          <Col componentClass={ControlLabel} sm={2}>View</Col>
          <Col sm={10}>
            <ButtonToolbar>
              <ToggleButtonGroup type="radio" name="view" defaultValue={view} onChange={this.handleViewChanged}>
                <ToggleButton value="bookshelf">Bookshelf</ToggleButton>
                <ToggleButton value="table">Table</ToggleButton>
                <ToggleButton value="list">List</ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <ButtonToolbar>
              <Button className="pull-right" type="submit" bsStyle="primary">Search</Button>
              <Button className="pull-right" bsStyle="default" onClick={this.handleClear}>Clear</Button>
            </ButtonToolbar>
          </Col>
        </FormGroup>
      </Form>
    </Panel>;
  }
}

export default LibrarySearch;