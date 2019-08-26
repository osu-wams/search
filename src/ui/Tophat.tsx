import React from 'react';
import styled from 'styled-components';
import logo from '../assets/images/logo-white.svg';
import { Color, breakpoints } from '../theme';
import TophatMenu from './TophatMenu';
import menuLinks from '../assets/menuLinks';

const TophatWrapper = styled.header`
  z-index: 1;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  justify-content: space-between;
  background-color: ${Color.white};
  @media screen and (min-width: ${breakpoints[768]}) {
    justify-content: flex-start;
  }
`;

const TophatLogo = styled.img`
  width: 188px;
  height: 60px;
  margin: 10px;
  max-width: 100%;
  vertical-align: middle;
  @media screen and (min-width: ${breakpoints[768]}) {
    width: 250px;
    height: 80px;
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  margin-right: 3.6rem;
`;

const Tophat = () => {
  return (
    <TophatWrapper data-testid="tophat" id="tophat-wrapper">
      <StyledLink data-testid="tophat-home" href="https://oregonstate.edu/">
        <TophatLogo data-testid="tophat-logo" src={logo} alt="Oregon State University" />
      </StyledLink>
      <TophatMenu items={menuLinks.tophat} />
    </TophatWrapper>
  );
};

export default Tophat;
