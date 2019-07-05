
import React from 'react';
import { render, cleanup, fireEvent, getByTestId } from '@testing-library/react';
import Results from '../Results';

afterEach(cleanup);

describe('Results should exist and function correctly', () => {
  it('should render a results card', () => {
    const {getByTestId} = render(<Results />);
    expect(getByTestId('result-card')).toBeInstanceOf(HTMLDivElement);
  });

  it('should render the results div ', () => {
    const {getByTestId} = render(<Results />);
    expect(getByTestId('results')).toBeInstanceOf(HTMLDivElement);
  });
});
