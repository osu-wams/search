import React, { useState } from 'react';
import styled from 'styled-components';
import { faBars, faTimes } from '@fortawesome/pro-light-svg-icons';
import { Menu, MenuButton, MenuList, MenuLink } from '@reach/menu-button';
import { Color, theme } from '../theme';
import Icon from './Icon';

const StyledMenuButton = styled(MenuButton)`
  border: none;
  background: none;
`;

const StyledMenuList = styled(MenuList)`
  display: flex;
  flex-direction: column;
  background-color: ${Color['white']};
  opacity: 0.96;
  position: absolute;
  top: 8.4rem;
  bottom: 0;
  right: 0;
  width: 100%;
  max-width: 480px;
  padding: 0 ${theme.spacing.unit * 4}px;
  [data-reach-menu-item] {
    &:hover,
    &:active,
    &:focus {
      color: ${Color['orange-400']};
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
`;

const TophatHamburgerMenu = (prop: any) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Menu>
      <StyledMenuButton data-testid="hamburger-menu" onClick={() => setOpen(!isOpen)}>
        {isOpen ? (
          <StyledIcon icon={faTimes} color={Color['neutral-550']} />
        ) : (
          <StyledIcon icon={faBars} color={Color['neutral-550']} />
        )}
      </StyledMenuButton>
      <StyledMenuList>
        {prop.items
          ? Object.keys(prop.items).map(key => {
              return (
                <MenuLink key={key} css="color=red;" href={prop.items[`${key}`]}>
                  {key}
                </MenuLink>
              );
            })
          : 'empty'}
      </StyledMenuList>
    </Menu>
  );
};

export default TophatHamburgerMenu;
