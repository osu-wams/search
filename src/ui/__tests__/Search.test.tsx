import React from 'react';
import { render, cleanup, fireEvent, getByTestId } from '@testing-library/react';
import Search from '../Search';

afterEach(cleanup);

describe('Search componet exists and functions correctly', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(<Search />);
    expect(getByTestId('search')).toBeInstanceOf(HTMLFormElement);
  });

  it('should set window.location.search to the new query', () => {
    const { getByTestId, debug } = render(<Search />);
    const search = getByTestId('search');
    const searchField = getByTestId('search-field');

    const location = {
      ...window.location,
      search: "test"
    };

    Object.defineProperty(window, 'location', {
      writable: true,
      value: location
    });

    fireEvent.change(searchField, {
      target: {
        value: 'newValue'
      }
    });

    fireEvent.submit(search);

    expect(window.location.search).toBe('?q=newValue');
  });
});
