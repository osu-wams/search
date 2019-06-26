import React from "react";
import styled from "styled-components";
import { breakpoints } from "./theme";

const StyledMenu = styled.nav`
  display: grid;
  margin-left: 5em;
  @media screen and (min-width: ${breakpoints[768]}) {
    grid-column-gap: 5px;
    grid-template-columns: repeat(6, 1fr);
  }
`

const TophatDesktopMenu = (prop: any) => {
  return (
    <StyledMenu>
      {prop.children}
    </StyledMenu>
  );
};

export default TophatDesktopMenu;