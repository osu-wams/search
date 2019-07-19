import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import Icon from './Icon';
import { Color, breakpoints, theme } from '../theme';

const SearchBarWrapper = styled.div`
  box-sizing: border-box;
  height: 64px;
  position: relative;
  /** TODO: Probably conditional switching to orenge  */
  background-color: ${Color.white};
  border-radius: ${theme.borderRadius};

  /** TODO: Probably conditional to white  */
  border: 2px solid ${Color['neutral-200']};
  &.notEmpty {
    border-color: ${Color['neutral-550']};
  }
  &.hovered {
    border-color: ${Color['neutral-600']};
  }
  &.focused {
    border-color: ${Color['orange-400']};
  }
  @media screen and (min-width: ${breakpoints[768]}) {
    width: 100%;
  }
  &.results {
    background-color: ${Color["orange-400"]};
    border-color: ${Color.white};
  }
`;

const SearchBarField = styled.input`
  height: 100%;
  font-size: ${theme.fontSize[24]};
  font-weight: 300;
  color: ${Color['neutral-550']};
  position: absolute;
  left: ${theme.spacing.unit * 3}px;
  background-color: transparent;
  border: 0;
  padding: 0;
  width: calc(100% - ${3 * (theme.spacing.unit * 3) + 24}px);
  &.results {
    color: ${Color.white};
  }
`;

const SearchBarIcon = styled(Icon)`
  font-size: ${theme.fontSize[24]};
  position: absolute;
  bottom: ${(60 - 24) / 2}px;
  right: ${theme.spacing.unit * 3}px;
`;

const SearchBarLabel = styled.label`
  @keyframes search-active {
    99% {
      background-color: transparent;
      color: ${Color['neutral-550']};
    }
    100% {
      background-color: ${props => props.theme.results ? Color.white : Color['orange-400']};
      color: ${props => props.theme.results ? Color["orange-400"] : Color.white};
    }
  }
  color: ${Color['neutral-550']};
  font-size: ${theme.fontSize[24]};
  font-weight: 300;
  position: absolute;
  left: ${theme.spacing.unit * 3}px;
  top: ${(60 - (24 + 24 / 2)) / 2}px;
  transition: all cubic-bezier(0.4, 0, 0.2, 1) 100ms;
  &.notEmpty,
  &.focused {
    /* color is set in the keyframe */
    font-size: ${theme.fontSize[11]};
    top: -${(11 + 11 / 2) / 2 + 1}px;
    bottom: auto;
    border-radius: ${(11 + 11 / 2) / 2}px;
    padding: 0 ${(11 * 2) / 3}px;
  }
  &.notEmpty {
    background-color: ${Color['neutral-550']};
    color: ${Color.white};
  }
  &.notEmpty.hovered {
    background-color: ${Color['neutral-600']};
    color: ${Color.white};
  }
  &.notEmpty.focused,
  &.focused {
    /* background-color is set in the keyframe */
    animation: search-active 100ms forwards;
    transform-origin: top left;
    transition: all cubic-bezier(0.4, 0, 0.2, 1) 100ms;
  }
  &.results {
    background-color: none;
    color: ${Color.white};
  }
  &.results.notEmpty {
    background-color: ${Color.white};
    color: ${Color["orange-400"]};
  }
`;

SearchBarLabel.defaultProps = {
  theme: {
    results: false
  }
}

const SearchBar = (prop: any) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [empty, setEmpty] = useState(true);
  const [results, setResults] = useState(false);

  useEffect(() => {
    if (window.location.search.startsWith('?q=')) {
      setEmpty(false);
      setResults(true);
      const searchField = document.getElementById('searchfield');
      if (searchField !== null) {
        (searchField as HTMLInputElement).value = decodeURI(window.location.search.substr(3));
      }
    }
  }, []);

  return (
    <SearchBarWrapper
      data-testid="search-bar"
      className={`${hovered ? 'hovered' : ''} ${focused ? 'focused' : ''} ${
        empty ? '' : 'notEmpty'
      } ${results ? 'results' : ''}`.trim()}
    >
      <SearchBarLabel
        theme={{results:results}}
        htmlFor="searchfield"
        className={`${hovered ? 'hovered' : ''} ${focused ? 'focused' : ''} ${
          empty ? '' : 'notEmpty'
        } ${results ? 'results' : ''}`.trim()}
      >
        Search
      </SearchBarLabel>
      <SearchBarField
        className={`${results ? 'results' : ''}`}
        data-testid="search-field"
        type="text"
        id="searchfield"
        onMouseOver={e => setHovered(true)}
        onMouseOut={e => setHovered(false)}
        onFocus={e => setFocused(true)}
        onBlur={e => setFocused(false)}
        onChange={e => {
          if (e.target.value === '') {
            setEmpty(true);
          } else {
            setEmpty(false);
          }
          prop.setQuery(e.target.value);
        }}
      />
      <SearchBarIcon icon={faSearch} color={results ? Color.white : Color['neutral-550']} />
    </SearchBarWrapper>
  );
};

export default SearchBar;
