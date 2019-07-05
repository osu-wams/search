import React, { useState } from 'react';
import { faLongArrowRight } from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import StyledButton from './StyledButton';
import Icon from './Icon';
import { Color, breakpoints, theme } from '../theme';

const SearchText = styled.h2`
  font-weight: 700;
  font-size: ${theme.fontSize[28]};
  color: ${Color.white};
  margin: 0;
  margin-bottom: ${theme.spacing.unit * 2}px;
  @media screen and (min-width: ${breakpoints[768]}) {
    font-size: ${theme.fontSize[48]};
    margin-bottom: ${theme.spacing.unit * 4}px;
  }
`;

const Search: React.FC = () => {
  const [query, setQuery] = useState('');

  const setUrl = (e: any) => {
    e.preventDefault();
    if (query !== '') {
      window.location.search = '?q=' + query;
    }
  };

  return (
    <form data-testid="search" onSubmit={setUrl}>
      <SearchText>Find pages, people and places at Oregon State University</SearchText>
      <SearchBar setQuery={setQuery} />
      <StyledButton type="submit">
        Search OSU
        <Icon icon={faLongArrowRight} color={Color.white} />
      </StyledButton>
    </form>
  );
};

export default Search;
