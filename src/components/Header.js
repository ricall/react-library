import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const PageLink = ({path, label}) => <Navbar.Text><Link to={path}>{label}</Link></Navbar.Text>;

const bookSummary = (books) => {
  let bookCount = Object.keys(books).length;
  if (bookCount) {
    return `Books in library: ${bookCount}`
  }
  return 'Empty Library'
};

export const Header = ({ title, books, fixedHeader }) =>
<Navbar inverse collapseOnSelect fixedTop={fixedHeader}>
  <Navbar.Header>
    <Navbar.Brand id="headerTitle">{title}</Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <PageLink path="/" label="Library"/>
    <PageLink path="/search" label="Search"/>
    <PageLink path="/about" label="About"/>
    <Nav>
      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3}>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
    <Nav pullRight>
      <NavItem id="headerSummary">{bookSummary(books)}</NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar>;

const mapState = (state) => ({ ...(state.library) });
const actions = { };

export default connect(mapState, actions)(Header);