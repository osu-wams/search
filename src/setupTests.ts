import '@testing-library/jest-dom/extend-expect';

afterEach(() => {
  // don't output debug statements to console
  jest.spyOn(console, 'debug').mockImplementation(() => {});

  jest.clearAllMocks();
});
