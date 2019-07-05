import React from 'react';
import { render, cleanup, fireEvent, getByTestId } from '@testing-library/react';
import SearchBar from '../SearchBar';
import { async } from 'q';

afterEach(cleanup);

describe('Search bar wrapper exists and functions correctly', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(<SearchBar />);
    expect(getByTestId('search-bar')).toBeInstanceOf(HTMLDivElement);
  });

  it('should have the hovered class name', () => {
    const { getByTestId } = render(<SearchBar />);
    const searchBar = getByTestId('search-bar');
    fireEvent.mouseOver(searchBar);
    expect(searchBar.classList.contains('hovered')).toBeTruthy;
  });

  it('should have the focused class name', () => {
    const { getByTestId } = render(<SearchBar />);
    const searchBar = getByTestId('search-bar');
    fireEvent.focus(searchBar);
    expect(searchBar.classList.contains('focused')).toBeTruthy;
  });

  it('should have the notEmpty class name', async () => {
    const { getByTestId } = render(<SearchBar setQuery={()=>{}} />);
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
