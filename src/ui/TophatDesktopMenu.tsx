import React from 'react';
import styled from 'styled-components';
import { Color, theme } from '../theme';

const StyledMenu = styled.nav`
  display: flex;
  justify-content: space-evenly;
`;

const MenuLink = styled.a`
  :hover {
    color: ${Color['orange-400']};
  }
  color: ${Color['neutral-600']};
  font-size: ${theme.fontSize['16']};
  text-decoration: none;
  padding: 0 ${theme.spacing.unit * 2}px;
`;

const TophatDesktopMenu = (prop: any) => {
  return (
    <StyledMenu data-testid="desktop-menu">
      {prop.items
        ? Object.keys(prop.items).map(key => {
            return (
              <MenuLink key={key} href={prop.items[`${key}`]}>
                {key}
              </MenuLink>
            );
          })
        : 'empty'}
    </StyledMenu>
  );
};

export default TophatDesktopMenu;
