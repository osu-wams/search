import React from 'react';
import { render, cleanup, fireEvent, getByTestId } from '@testing-library/react';
import HMenu from '../TophatDesktopMenu';

afterEach(cleanup);

describe('Menu items exist', () => {
  it('should contain a list of 3 items: A, B, and C', () => {
    const { getByText } = render(
      <HMenu
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