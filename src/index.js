import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import 'rxjs';

import storeFactory from './store';
import registerServiceWorker from './registerServiceWorker';
import { Library } from './actions';

import App from './App';

const history = createBrowserHistory();
const store = storeFactory(history);
store.dispatch(Library.loadLibrary());

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
