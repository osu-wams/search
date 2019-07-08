import React from 'react';
import styled from 'styled-components';
import logo from '../assets/images/logo.png';
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
  padding: 2rem;
  justify-content: space-between;
  background-color: ${Color.white};
  @media screen and (min-width: ${breakpoints[768]}) {
    justify-content: flex-start;
  }
`;

const TophatLogo = styled.img`
  height: 100%;
`;

const StyledLink = styled.a`
  height: 4.4rem;
  margin-right: 3.6rem;
`;

const Tophat = () => {
  return (
    <TophatWrapper id="tophat-wrapper">
      <StyledLink href="https://oregonstate.edu/">
        <TophatLogo src={logo} alt="Oregon State University" />
      </StyledLink>
      <TophatMenu items={menuLinks.tophat} />
    </TophatWrapper>
  );
};

export default Tophat;
