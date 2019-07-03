import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Tophat from '../Tophat';

afterEach(cleanup);

beforeAll(
  (window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    };
  }))
);

describe('Tophat exists', () => {
  it('should render a tophat wraper', () => {
    const { getByTestId } = render(<Tophat />);
    expect(getByTestId('tophat')).toBeInstanceOf(HTMLElement);
  });

  it('should render a tophat home link', () => {
    const { getByTestId } = render(<Tophat />);
    expect(getByTestId('tophat-home')).toBeInstanceOf(HTMLAnchorElement);
  });

  it('should render a tophat logo image', () => {
    const { getByTestId } = render(<Tophat />);
    expect(getByTestId('tophat-logo')).toBeInstanceOf(HTMLImageElement);
  });

  it('should render a desktop menu when veiwport larger then 768', () => {
    const { getByTestId } = render(<Tophat />);
    expect(getByTestId('desktop-menu')).toBeInstanceOf(HTMLElement);
  });

  it('should render a hamburger menu when veiwport smaller then 768', () => {
    window.matchMedia = jest.fn().mockImplementation(query => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    });
    const { getByTestId } = render(<Tophat />);
    expect(getByTestId('hamburger-menu')).toBeInstanceOf(HTMLElement);
  });
});
