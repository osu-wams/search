import React, { useState } from 'react';
import { faLongArrowRight } from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import StyledButton from './StyledButton';
import Icon from './Icon';
import { Color, breakpoints, theme } from '../theme';

const SubmitForm = styled.form`
  box-sizing: border-box;
  width: 100%;
  padding: ${theme.spacing.unit * 2}px;
  @media screen and (min-width: ${breakpoints[768]}) {
    width: 768px;
  }
`;

const Search: React.FC = () => {
  const [query, setQuery] = useState('');

  const setUrl = (e: any) => {
    e.preventDefault();
    if (query !== '') {
      window.location.search = '?q=' + encodeURI(query);
    }
  };

  return (
    <SubmitForm data-testid="search" onSubmit={setUrl}>
      <SearchBar setQuery={setQuery} />
      <StyledButton type="submit">
        Search OSU
        <Icon icon={faLongArrowRight} color={Color.white} />
      </StyledButton>
    </SubmitForm>
  );
};

export default Search;
