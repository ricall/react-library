import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import LibraryPage from './components/LibraryPage';
import SearchPage from './components/SearchPage';
import AboutPage from './components/AboutPage';

const styles = {
  fixedHeader: {
    margin: '52px 1em',
  },
  scrollHeader: {
    margin: '5px 0',
  },
};

const fixedHeader = window.innerHeight < 768 ? false : true;

const App = () => (
<div>
  <Header title="Library Demo" fixedHeader={fixedHeader}/>
  <div style={fixedHeader ? styles.fixedHeader : styles.scrollHeader}>
    <Switch>
      <Route path="/" exact={true} component={LibraryPage} />
      <Route path="/search" component={SearchPage}/>
      <Route path="/about" component={AboutPage}/>
    </Switch>
  </div>
  <Footer/>
</div>);

export default App;