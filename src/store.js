import { createStore, compose, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
import dependencies from './dependencies';

import logger from 'redux-logger';

import epics from './epics';
import reducers from './reducers';

const createStoreFromHistory = (history) => {
  const middleware = [
    logger,
    routerMiddleware(history),
    createEpicMiddleware(epics, { dependencies }),
  ];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  return createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));
};

export default createStoreFromHistory;