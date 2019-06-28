import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Media from 'react-media';
import logo from './assets/images/logo.png';
import { breakpoints } from './theme';
import DesktopMenu from './TophatDesktopMenu';
import HamburgerMenu from './TophatHamburgerMenu';

const TophatWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  justify-content: space-between;
  @media screen and (min-width: ${breakpoints[768]}) {
    justify-content: flex-start;
  }
`;

const TophatLogo = styled.img`
  height: 100%;
`;

const StyledLink = styled.a`
  height: 44px;
`;

const urls = {
  About: 'https://oregonstate.edu/about',
  Academics: 'https://oregonstate.edu/academics',
  Research: 'https://oregonstate.edu/osuresearch',
  Outreach: 'https://outreach.oregonstate.edu',
  Athletics: 'https://osubeavers.com',
  OSU150: 'https://oregonstate.edu/osu150'
};

const Tophat = () => {
  const [height, setHeight] = useState();

  useEffect(() => {
    const header = document.getElementById('tophat-wrapper');
    if (header) setHeight(header.clientHeight);
  }, []);

  return (
    <TophatWrapper id="tophat-wrapper">
      <StyledLink href="https://oregonstate.edu/">
        <TophatLogo src={logo} />
      </StyledLink>
      <Media query={`(min-width: ${breakpoints[768]})`}>
        {matches =>
          matches ? <DesktopMenu items={urls} /> : <HamburgerMenu items={urls} pos={height} />
        }
      </Media>
    </TophatWrapper>
  );
};

export default Tophat;
