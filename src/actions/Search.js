import { createAction } from 'redux-act';

export default {
  search: createAction('search'),
  onSearchResult: createAction('onSearchResult'),
  onSearchError: createAction('onSearchError'),
  updateSearchStatus: createAction('updateSearchStatus'),
}