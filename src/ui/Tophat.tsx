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
    <TophatWrapper data-testid="tophat" id="tophat-wrapper">
      <StyledLink data-testid="tophat-home" href="https://oregonstate.edu/">
        <TophatLogo data-testid="tophat-logo" src={logo} />
      </StyledLink>
<<<<<<< HEAD
      <TophatMenu items={menuLinks.tophat} />
=======
      <Media query={`(min-width: ${breakpoints[768]})`}>
        {matches =>
          matches ? (
            <DesktopMenu items={urls} />
          ) : (
            <HamburgerMenu items={urls} />
          )
        }
      </Media>
>>>>>>> develop
    </TophatWrapper>
  );
};

export default Tophat;
