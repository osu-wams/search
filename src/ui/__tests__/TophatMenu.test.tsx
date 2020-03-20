import React from 'react';
import userEvent from '@testing-library/user-event';
import TophatMenu from '../TophatMenu';
import { render } from '../../utils/test-utils';

const menuItems = [
  { name: 'testA', url: 'https://testing.com/A' },
  { name: 'testB', url: 'https://testing.com/B' },
  { name: 'testC', url: 'https://testing.com/C' }
];

describe('Hamburger menu exists', () => {
  it('should render a hamburger menu button', () => {
    const { getByTestId } = render(<TophatMenu items={menuItems} />);
    expect(getByTestId('hamburger-menu')).toBeInTheDocument();
  });

  it('should render a list of 3 items: testA, testB, and testC', async () => {
    const { findByText, getByTestId } = render(<TophatMenu items={menuItems} />);

    await userEvent.click(getByTestId('hamburger-menu'));

    expect(await findByText('testA')).toBeVisible();
    expect(await findByText('testB')).toBeVisible();
    expect(await findByText('testC')).toBeVisible();
  });
});

describe('Desktop view menu exists', () => {
  it('should contain a list of 3 items: A, B, and C', () => {
    const { getByText } = render(<TophatMenu items={menuItems} />, { isDesktop: true });

    expect(getByText('testA')).toBeVisible();
    expect(getByText('testB')).toBeVisible();
    expect(getByText('testC')).toBeVisible();
  });
});
