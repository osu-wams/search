import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import TophatMenu from '../TophatMenu';

afterEach(cleanup);

// Mobile
/* This function mocks media queries. Changing the value of
 * `matches` determines whether it's desktop or mobile. A
 * value of `true` means desktop, `false` means mobile.
 */
window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn()
  };
});

describe('Hamburger menu exists', () => {
  it('should render a hamburger menu button', () => {
    const { getByTestId } = render(<TophatMenu />);
    expect(getByTestId('hamburger-menu')).toBeInstanceOf(HTMLButtonElement);
  });

  it('should render a list of 3 items: testA, testB, and testC', () => {
    const { getByText, getByTestId } = render(
      <TophatMenu
        items={{
          testA: 'https://testing.com/A',
          testB: 'https://testing.com/B',
          testC: 'https://testing.com/C'
        }}
      />
    );

    fireEvent.click(getByTestId('hamburger-menu'));
    expect(getByText('testA')).toBeInstanceOf(HTMLAnchorElement);
    expect(getByText('testB')).toBeInstanceOf(HTMLAnchorElement);
    expect(getByText('testC')).toBeInstanceOf(HTMLAnchorElement);
  });
});
