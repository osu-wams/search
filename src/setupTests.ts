import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();

  // don't output debug statements to console
  vi.spyOn(console, 'debug').mockImplementation(() => {});

  vi.clearAllMocks();
});
