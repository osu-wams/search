import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, MenuLink } from '@reach/menu-button';

const TophatHamburgerMenu = (prop: any) => {
  return (
    <Menu>
      <MenuButton>
        Actions <span aria-hidden>▾</span>
      </MenuButton>
      <MenuList>
        <MenuItem onSelect={() => alert("Download")}>Download</MenuItem>
        <MenuItem onSelect={() => alert("Copy")}>Create a Copy</MenuItem>
        <MenuItem onSelect={() => alert("Mark as Draft")}>Mark as Draft</MenuItem>
        <MenuItem onSelect={() => alert("Delete")}>Delete</MenuItem>
        <MenuLink
          as="a"
          href="https://reach.tech/workshops"
        >Attend a Workshop</MenuLink>
      </MenuList>
    </Menu>
  );
};

export default TophatHamburgerMenu;