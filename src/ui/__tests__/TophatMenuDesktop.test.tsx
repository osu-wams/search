import React from 'react';
import { render, cleanup } from '@testing-library/react';
import TophatMenu from '../TophatMenu';

afterEach(cleanup);

// Desktop
/* This function mocks media queries. Changing the value of
 * `matches` determines whether it's desktop or mobile. A
 * value of `true` means desktop, `false` means mobile.
 */
window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: true,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn()
  };
});

describe('Menu items exist', () => {
  it('should contain a list of 3 items: A, B, and C', () => {
    const { getByText } = render(
      <TophatMenu
        items={{
          testA: 'https://testing.com/A',
          testB: 'https://testing.com/B',
          testC: 'https://testing.com/C'
        }}
      />
    );

    expect(getByText('testA')).not.toBeNull();
    expect(getByText('testB')).not.toBeNull();
    expect(getByText('testC')).not.toBeNull();
  });
});
