import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import TophatMenu from '../TophatMenu';

afterEach(cleanup);

const setMatchMedia = match => {
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: match,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    };
  });
};

describe('Hamburger menu exists', () => {
  beforeAll(()=> setMatchMedia(false));
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

describe('Desktop view menu exists', () => {
  beforeAll(()=> setMatchMedia(true));
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
