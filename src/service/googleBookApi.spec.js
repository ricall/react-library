import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';
import api from './googleBookApi';

[
  {
    query: { isbn: '1234' },
    queryString: 'isbn:1234'
  }, {
    query: { inTitle: '', inAuthor: '', text: '', isbn: '1234' },
    queryString: 'isbn:1234'
  }, {
    query: { inTitle: 'Title', inAuthor: 'Author', text: 'Text' },
    queryString: 'inTitle:Title+inAuthor:Author+Text'
  }, {
    query: { inTitle: 'Title', inAuthor: '', text: '' },
    queryString: 'inTitle:Title'
  }, {
    query: { inTitle: '', inAuthor: 'Author', text: '' },
    queryString: 'inAuthor:Author'
  }, {
    query: { inTitle: '', inAuthor: '', text: 'Text' },
    queryString: 'Text'
  }, {
    query: { inTitle: 'Title with spaces', inAuthor: 'Fred&Mary', text: '$#@!%^&*()' },
    queryString: 'inTitle:Title%20with%20spaces+inAuthor:Fred&Mary+$#@!%25%5E&*()'
  },
].forEach(({ query, queryString }) => {
  it(`queries google book API with ${JSON.stringify(query)}`, () => {
    expect.assertions(2);
    const response = { status: 'ok' };
    ajax.getJSON = jest.fn(() => Observable.of(response));

    return api.search(query).toPromise()
      .then(r => {
        expect(r).toBe(response);
        expect(ajax.getJSON)
          .toBeCalledWith(`https://www.googleapis.com/books/v1/volumes?q=${queryString}&maxResults=40&langRestrict=en`);
      });
  });
});