import React, { useState } from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import Icon from './Icon';
import { Color, breakpoints, theme } from './theme';

const SearchBarWrapper = styled.div`
  box-sizing: border-box;
  height: 64px;
  position: relative;
  background-color: ${Color.white};
  border-radius: ${theme.borderRadius};
  border: 2px solid ${Color['neutral-200']};
  &.notEmpty {
    border-color: ${Color['neutral-400']};
  }
  &.hovered {
    border-color: ${Color['neutral-500']};
  }
  &.focused {
    border-color: ${Color['orange-400']};
  }
  @media screen and (min-width: ${breakpoints[768]}) {
    width: 100%;
  }
`;

const SearchBarField = styled.input`
  height: 100%;
  font-size: ${theme.fontSize[24]};
  font-weight: 400;
  color: ${Color['neutral-550']};
  position: absolute;
  left: ${theme.spacing.unit * 3}px;
  background-color: transparent;
  border: 0;
  padding: 0;
  width: calc(100% - ${3 * (theme.spacing.unit * 3) + 24}px);
`;

const SearchBarIcon = styled(Icon)`
  font-size: ${theme.fontSize[24]};
  position: absolute;
  bottom: ${(60 - 24) / 2}px;
  right: ${theme.spacing.unit * 3}px;
`;

const SearchBarLabel = styled.label`
  color: ${Color['neutral-550']};
  font-size: ${theme.fontSize[24]};
  position: absolute;
  left: ${theme.spacing.unit * 3}px;
  bottom: ${(60 - (24 + 24 / 2)) / 2}px;
  &.notEmpty,
  &.focused {
    color: ${Color.white};
    font-size: ${theme.fontSize[11]};
    top: -${(11 + 11 / 2) / 2 + 1}px;
    bottom: auto;
    border-radius: ${(11 + 11 / 2) / 2}px;
    padding: 0 ${(11 * 2) / 3}px;
  }
  &.notEmpty {
    background-color: ${Color['neutral-400']};
  }
  &.notEmpty.hovered {
    background-color: ${Color['neutral-500']};
  }
  &.notEmpty.focused,
  &.focused {
    background-color: ${Color['orange-400']};
  }
`;

const SearchBar = (prop: any) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [empty, setEmpty] = useState(true);
  return (
    <SearchBarWrapper
      className={`${hovered ? 'hovered' : ''} ${focused ? 'focused' : ''} ${
        empty ? '' : 'notEmpty'
      }`.trim()}
    >
      <SearchBarLabel
        className={`${hovered ? 'hovered' : ''} ${focused ? 'focused' : ''} ${
          empty ? '' : 'notEmpty'
        }`.trim()}
      >
        Search
      </SearchBarLabel>
      <SearchBarField
        type="text"
        onMouseOver={e => setHovered(true)}
        onMouseOut={e => setHovered(false)}
        onFocus={e => setFocused(true)}
        onBlur={e => setFocused(false)}
        onChange={e => {
          if (e.target.value === '') {
            setEmpty(true);
          } else {
            setEmpty(false);
            prop.setQuery(e.target.value);
          }
        }}
      />
      <SearchBarIcon icon={faSearch} color={Color['neutral-550']} />
    </SearchBarWrapper>
  );
};

export default SearchBar;
