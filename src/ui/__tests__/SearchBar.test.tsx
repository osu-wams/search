import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../SearchBar';

describe('Search bar wrapper exists and functions correctly', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(<SearchBar />);
    expect(getByTestId('search-bar')).toBeInTheDocument();
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

    await userEvent.type(searchField, 'new value');

    expect(searchBar.classList.contains('notEmpty')).toBeTruthy();
  });
});

describe('Search bar label exists and functions correctly', () => {
  it('should render without crashing', () => {
    const { getByLabelText } = render(<SearchBar />);
    expect(getByLabelText('Search')).toBeInTheDocument();
  });
});
