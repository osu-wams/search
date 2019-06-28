import React from 'react';
import styled from 'styled-components';

const SearchBarWrapper = styled.div``;
const SearchBarField = styled.input``;
const SearchBarIcon = styled.span``;

const SearchBar = (prop: any) => {
  return (
    <SearchBarWrapper>
      <SearchBarField
        type="text"
        placeholder="Search"
        onChange={e => {
          prop.setQuery(e.target.value);
        }}
      />
      <SearchBarIcon>Icon</SearchBarIcon>
    </SearchBarWrapper>
  );
};

export default SearchBar;
