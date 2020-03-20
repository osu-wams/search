import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../Search';

describe('Search component exists and functions correctly', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(<Search />);
    expect(getByTestId('search')).toBeInTheDocument();
  });

  it('should set window.location.search to the new query', async () => {
    const { getByTestId } = render(<Search />);
    const search = getByTestId('search');
    const searchField = getByTestId('search-field');

    const location = {
      ...window.location,
      search: 'test'
    };

    Object.defineProperty(window, 'location', {
      writable: true,
      value: location
    });

    await userEvent.type(searchField, 'newValue');

    fireEvent.submit(search);

    expect(window.location.search).toBe('?q=newValue');
  });
});
