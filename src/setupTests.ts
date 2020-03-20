import '@testing-library/jest-dom/extend-expect';

// Remove this when CRA updates to jsdom 16+ (not available as of CRA 3.4)
import MutationObserver from '@sheerun/mutationobserver-shim';
window.MutationObserver = MutationObserver;

afterEach(() => {
  // don't output debug statements to console
  jest.spyOn(console, 'debug').mockImplementation(() => {});

  jest.clearAllMocks();
});
