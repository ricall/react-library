import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import searchReducer from './search';
import libraryReducer from './library';

export default combineReducers({
  routing: routerReducer,
  search: searchReducer,
  library: libraryReducer,
})