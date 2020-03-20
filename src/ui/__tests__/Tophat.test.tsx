import React from 'react';
import Tophat from '../Tophat';
import { render } from '../../utils/test-utils';

describe('Tophat exists', () => {
  it('should render a tophat wrapper', () => {
    const { getByTestId } = render(<Tophat />);
    expect(getByTestId('tophat')).toBeInTheDocument();
  });

  it('should render a tophat home link', () => {
    const { getByTestId } = render(<Tophat />);
    expect(getByTestId('tophat-home')).toBeInTheDocument();
  });

  it('should render a tophat logo image', () => {
    const { getByTestId } = render(<Tophat />);
    expect(getByTestId('tophat-logo')).toBeInTheDocument();
  });

  it('should render a desktop menu when viewport larger than 768', () => {
    const { getByTestId } = render(<Tophat />, { isDesktop: true });
    expect(getByTestId('desktop-menu')).toBeInTheDocument();
  });

  it('should render a hamburger menu when viewport smaller than 768', () => {
    const { getByTestId } = render(<Tophat />);
    expect(getByTestId('hamburger-menu')).toBeInTheDocument();
  });
});
