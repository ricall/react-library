import { createAction } from 'redux-act';

export default {
  addBook: createAction('addBook'),
  removeBook: createAction('removeBook'),
  onBookAdded: createAction('onBookAdded'),
  onBookRemoved: createAction('onBookRemoved'),
  onBookError: createAction('onBookError'),
  loadLibrary: createAction('loadLibrary'),
  onSaveLibrary: createAction('onSaveLibrary'),
  onSearchTextChanged: createAction('onSearchTextChanged'),
  onLibraryViewChanged: createAction('onLibraryViewChanged'),
  onLibrarySearch: createAction('onLibrarySearch'),
  showBookDetails: createAction('showBookDetails'),
}