
import React from "react";
import styled from "styled-components";
import logo from "./assets/images/logo.png";
import { Color, theme } from "./theme";

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

const TophatMenu = styled.nav`
  display: grid;
  grid-column-gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  margin-left: 5em;
`

const MenuLink = styled.a`
  color: ${Color["neutral-600"]};
  font-size: ${theme.fontSize['16']};
`

const Tophat = (prop: any) => {
  return (
    <TophatWrapper className="tophat-wrapper">
      <a href="https://oregonstate.edu/">
        <TophatLogo src={logo} />
      </a>
      <TophatMenu>
        <MenuLink href="https://oregonstate.edu/about">About</MenuLink>
        <MenuLink href="https://oregonstate.edu/academics">Academics</MenuLink>
        <MenuLink href="https://oregonstate.edu/osuresearch">Research</MenuLink>
        <MenuLink href="https://outreach.oregonstate.edu">Outreach</MenuLink>
        <MenuLink href="https://osubeavers.com">Athletics</MenuLink>
        <MenuLink href="https://oregonstate.edu/osu150">OSU150</MenuLink>
      </TophatMenu>
    </TophatWrapper>
  );
};

export default Tophat;