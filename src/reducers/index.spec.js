import reducer from './index';
import { initialState as library } from './library';
import { initialState as search } from './search';

it('reduces undefined to expected initial state', () => {
  expect(reducer(undefined)).toEqual(expect.objectContaining({
    library, search,
  }));
});