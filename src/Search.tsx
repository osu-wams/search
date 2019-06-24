import React from 'react';
import SearchBar from './SearchBar';
import SearchButton from './SearchButton';

const Search: React.FC = () => {
  return (
    <>
      <SearchBar />
      <SearchButton> Search OSU -></SearchButton>
    </>
  );
}

export default Search;