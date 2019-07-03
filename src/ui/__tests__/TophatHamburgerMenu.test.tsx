
import React from 'react';
import { render, cleanup, fireEvent, getByTestId } from '@testing-library/react';
import HMenu from '../TophatHamburgerMenu';

afterEach(cleanup);

describe('Hamburger menu exists', () => {

  it('should render a hamburger menu button', () => {
    const { getByTestId } = render(<HMenu />);
    expect(getByTestId('hamburger-menu')).toBeInstanceOf(HTMLButtonElement);
  });

  it('should contain a list of 3 items: A, B, and C', () => {
    const { getByText, getByTestId } = render(
      <HMenu
        items={{
          testA: 'https://testing.com/A',
          testB: 'https://testing.com/B',
          testC: 'https://testing.com/C'
        }}
      />
    );

    expect(getByTestId('hamburger-menu')).toBeInstanceOf(HTMLButtonElement);
    fireEvent.click(getByTestId('hamburger-menu'));
    expect(getByText('testA')).toBeInstanceOf(HTMLAnchorElement);
    expect(getByText('testB')).toBeInstanceOf(HTMLAnchorElement);
    expect(getByText('testC')).toBeInstanceOf(HTMLAnchorElement);
  });
});