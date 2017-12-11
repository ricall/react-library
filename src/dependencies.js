import { Scheduler } from 'rxjs';
import googleBookApi from './service/googleBookApi';
import bookApi from './service/bookApi';

export default {
  // Search
  googleBookApi,
  updateStatusDelay: 2000,

  // Library
  saveLibraryDelay: 5000,
  librarySearchDelay: 1000,
  bookApi,

  // Common
  scheduler:  Scheduler.async // setup the default rx scheduler for epics as the async scheduler, to be overridden in tests
};
