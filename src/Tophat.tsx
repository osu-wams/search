import React from "react";
import styled from "styled-components";
import logo from "./assets/images/logo.png";
import { Color, theme, breakpoints } from "./theme";
import Media from 'react-media';
import DesktopMenu from './TophatDesktopMenu';
import HamburgerMenu from './TophatHamburgerMenu';

const TophatWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${Color['white']};
  padding: 1em;
`
const TophatLogo = styled.img`
  height: 50px;
`

const MenuLink = styled.a`
  :hover{ color: ${Color["orange-400"]}; }
  color: ${Color["neutral-600"]};
  font-size: ${theme.fontSize['16']};
  text-decoration: none;
`

const Tophat = (prop: any) => {
  return (
    <TophatWrapper className="tophat-wrapper">
      <a href="https://oregonstate.edu/">
        <TophatLogo src={logo} />
      </a>

      <Media query={`(max-width: ${breakpoints[768]})`}>
        {
          matches => matches ? (
            <HamburgerMenu />
          ) : (
              <DesktopMenu>
                <MenuLink href="https://oregonstate.edu/about">About</MenuLink>
                <MenuLink href="https://oregonstate.edu/academics">Academics</MenuLink>
                <MenuLink href="https://oregonstate.edu/osuresearch">Research</MenuLink>
                <MenuLink href="https://outreach.oregonstate.edu">Outreach</MenuLink>
                <MenuLink href="https://osubeavers.com">Athletics</MenuLink>
                <MenuLink href="https://oregonstate.edu/osu150">OSU150</MenuLink>
              </DesktopMenu>
            )
        }
      </Media>

    </TophatWrapper>
  );
};

export default Tophat;