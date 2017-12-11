import { ajax } from 'rxjs/observable/dom/ajax';

export const host = 'https://www.googleapis.com';
export const uri = '/books/v1/volumes';

// const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=40&langRestrict=en&fields=totalItems,items/id,items/volumeInfo,items/searchInfo`
export const toQueryParams = (query) => {
  const q = Object.keys(query)
    .filter(k => query[k])
    .map(k => `${k}:${encodeURI(query[k])}`)
    .join('+').replace(/text:/g, '');
  return `q=${q}&maxResults=40&langRestrict=en`;
};

const searchUrl = (query) => `${host}${uri}?${toQueryParams(query)}`;

export default {
  search: (query) => ajax.getJSON(searchUrl(query)),
}