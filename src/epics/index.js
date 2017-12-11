import { combineEpics } from 'redux-observable';
import search from './search';
import library from './library';

export default combineEpics(
    search,
    library);
