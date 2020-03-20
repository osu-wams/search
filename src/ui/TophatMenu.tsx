import React, { useState } from 'react';
import styled from 'styled-components';
import { faBars, faTimes } from '@fortawesome/pro-light-svg-icons';
import { Menu, MenuButton, MenuList, MenuLink } from '@reach/menu-button';
import { Color, theme } from '../theme';
import Icon from './Icon';
import { Desktop, Mobile } from '../utils/mediaQuery';

const StyledMenuButton = styled(MenuButton)`
  border: none;
  background: none;
  padding: 28px 20px;
`;

const StyledMenuList = styled(MenuList)`
  padding: 0 ${theme.spacing.unit * 4}px;
  [data-reach-menu-item] {
    &:hover,
    &:active,
    &:focus,
    &[data-selected] {
      color: ${Color['orange-400']};
      outline: 0px solid transparent;
    }
    display: block;
    color: ${Color['neutral-600']};
    font-size: ${theme.fontSize['24']};
    padding: ${theme.spacing.unit * 2}px;
    text-decoration: none;
  }
`;

const StyledIcon = styled(Icon)`
  font-size: ${theme.fontSize[24]};
  color: ${Color['neutral-550']};
`;

const StyledMenu = styled.nav`
  display: flex;
  justify-content: space-evenly;
`;

const StyledLink = styled.a`
  &:hover,
  &:focus {
    color: ${Color['orange-400']};
  }
  color: ${Color['neutral-600']};
  font-size: ${theme.fontSize['16']};
  text-decoration: none;
  padding: 0 ${theme.spacing.unit * 2}px;
`;

const TophatMenu = (prop: any) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Desktop>
        <StyledMenu data-testid="desktop-menu">
          {prop!.items!.map(i => (
            <StyledLink key={i.name} href={i.url}>
              {i.name}
            </StyledLink>
          ))}
        </StyledMenu>
      </Desktop>
      <Mobile>
        <Menu>
          <StyledMenuButton data-testid="hamburger-menu" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <StyledIcon icon={faTimes} /> : <StyledIcon icon={faBars} />}
          </StyledMenuButton>
          <StyledMenuList>
            {prop!.items!.map(i => (
              <MenuLink key={i.name} href={i.url}>
                {i.name}
              </MenuLink>
            ))}
          </StyledMenuList>
        </Menu>
      </Mobile>
    </>
  );
};

export default TophatMenu;
