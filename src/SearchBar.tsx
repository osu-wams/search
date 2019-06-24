import React from 'react';
import styled from 'styled-components';

const Div = styled.div``;
const Input = styled.input``;
const Span = styled.span``;

const SearchBar: React.FC = () => {
  return (
    <Div>
      <Input type="text" placeholder="Search" />
      <Span>Icon</Span>
    </Div>
  );
};

export default SearchBar;