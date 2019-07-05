import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

afterEach(cleanup);

describe('Search bar wrapper exists and functions correctly', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(<SearchBar />);
    expect(getByTestId('search-bar')).toBeInstanceOf(HTMLDivElement);
  });

  it('should have the hovered class name', () => {
    const { getByTestId } = render(<SearchBar />);
    const searchBar = getByTestId('search-bar');
    const searchField = getByTestId('search-field');

    fireEvent.mouseOver(searchField);
    expect(searchBar.classList.contains('hovered')).toBeTruthy();
  });

  it('should have the focused class name', () => {
    const { getByTestId } = render(<SearchBar />);
    const searchBar = getByTestId('search-bar');
    const searchField = getByTestId('search-field');

    fireEvent.focus(searchField);
    expect(searchBar.classList.contains('focused')).toBeTruthy();
  });

  it('should have the notEmpty class name', async () => {
    const { getByTestId } = render(<SearchBar setQuery={() => {}} />);
    const searchField = getByTestId('search-field');
    const searchBar = getByTestId('search-bar');

    await fireEvent.change(searchField, {
      target: {
        value: 'new value'
      }
    });

    expect(searchBar.classList.contains('notEmpty')).toBeTruthy();
  });
});

describe('Search bar label exists and functions correctly', () => {
  it('should render without crashing', () => {
    const { getByText } = render(<SearchBar />);
    expect(getByText('Search')).toBeInstanceOf(HTMLLabelElement);
  });
});
