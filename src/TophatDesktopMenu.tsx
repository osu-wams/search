import React from "react";
import styled from "styled-components";
import { Color, theme } from "./theme";

const StyledMenu = styled.nav`
  display: grid;
  margin-left: 5em;
  grid-column-gap: 5px;
  grid-template-columns: repeat(6, 1fr);
`

const MenuLink = styled.a`
  :hover{ color: ${Color["orange-400"]}; }
  color: ${Color["neutral-600"]};
  font-size: ${theme.fontSize['16']};
  text-decoration: none;
`

const TophatDesktopMenu = (prop: any) => {
  return (
    <StyledMenu>
      {
        Object.keys(prop.items).map(key => {
          return (<MenuLink
            href={prop.items[`${key}`]}
          >{key}</MenuLink>)
        })
      }
    </StyledMenu>
  );
};

export default TophatDesktopMenu;