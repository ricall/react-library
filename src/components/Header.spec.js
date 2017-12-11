import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';

const state = {
  title: 'test title',
  books: {},
  fixedHeader: true,
};

const renderHeader = (props) => shallow(<Header {...{...state, ...props}} />);

describe('Header component', () => {

  it('renders', () => {
    const header = renderHeader();

    expect(header.props().fixedTop).toEqual(true);
    expect(header.find('#headerTitle').render().text()).toEqual('test title');
    expect(header.find('#headerSummary').render().text()).toEqual('Empty Library');
  });

  it('contains links to other pages', () => {
    const header = renderHeader();

    expect(header.find('PageLink').map(link => {
        const {path, label} = link.props();
        return {path, label}
      }
    )).toEqual([{
      path: '/',
      label: 'Library',
    }, {
      path: '/search',
      label: 'Search',
    }, {
      path: '/about',
      label: 'About',
    }]);
  });

  it('can be unfixed', () => {
    const header = renderHeader({fixedHeader: false});

    expect(header.props().fixedTop).toEqual(false);
  });

  it('can have a different title', () => {
    const header = renderHeader({title: 'New Title'});

    expect(header.find('#headerTitle').render().text()).toEqual('New Title');
  });

  it('displays the number of books in the library', () => {
    const header = renderHeader({books: {1: {}, 2: {}, 3: {}}});

    expect(header.find('#headerSummary').render().text()).toEqual('Books in library: 3');
  });

});