import React, { useState } from 'react';
import styled from 'styled-components';
import { faBars, faTimes } from '@fortawesome/pro-light-svg-icons';
import { Menu, MenuButton, MenuList, MenuLink } from '@reach/menu-button';
import { Color, theme } from '../theme';
import Icon from '../Icon';

const StyledMenuButton = styled(MenuButton)`
  border: none;
  background: none;
`;

const StyledMenuList = styled(MenuList)`
  display: flex;
  flex-direction: column;
  background-color: ${Color['white']};
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: ${props => props.pos}px;
  bottom: 0;
  padding: 0px ${theme.spacing.unit * 4}px;
`;

const StyledMenuLink = styled(MenuLink)`
  :hover {
    color: ${Color['orange-400']};
  }
  color: ${Color['neutral-600']};
  font-size: ${theme.fontSize['24']};
  text-decoration: none;
  padding: ${theme.spacing.unit * 2}px;
`;

const StyledIcon = styled(Icon)`
  font-size: ${theme.fontSize[24]};
`;

const TophatHamburgerMenu = (prop: any) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Menu>
      <StyledMenuButton onClick={() => setOpen(!isOpen)}>
        {isOpen ? (
          <StyledIcon icon={faTimes} color={Color['neutral-550']} />
        ) : (
          <StyledIcon icon={faBars} color={Color['neutral-550']} />
        )}
      </StyledMenuButton>
      <StyledMenuList pos={prop.pos}>
        {Object.keys(prop.items).map(key => {
          return (
            <StyledMenuLink as="a" href={prop.items[`${key}`]}>
              {key}
            </StyledMenuLink>
          );
        })}
      </StyledMenuList>
    </Menu>
  );
};

export default TophatHamburgerMenu;
