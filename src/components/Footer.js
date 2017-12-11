import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'

const Footer = (props) => <Navbar className="hidden-sm hidden-xs" inverse fixedBottom={true}>
  <Nav pullRight>
    <NavItem>&copy;2017 Richard Allwood</NavItem>
  </Nav>
</Navbar>;

export default Footer;