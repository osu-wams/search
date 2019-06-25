import React from "react";
import styled from "styled-components";

const SearchBarWrapper = styled.div``;
const SearchBarField = styled.input``;
const SearchBarIcon = styled.span``;

const SearchBar: React.FC = setQuery => {
  return (
    <SearchBarWrapper>
      <SearchBarField type="text" placeholder="Search" onChange={setQuery} />
      <SearchBarIcon>Icon</SearchBarIcon>
    </SearchBarWrapper>
  );
};

export default SearchBar;
