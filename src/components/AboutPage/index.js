import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap'

const AboutPage = (props) => <Jumbotron>
  <h1>About Page</h1>
  <p>Describes the Application</p>
  <p><Button bsStyle="primary">Learn more</Button></p>
</Jumbotron>;

export default AboutPage;