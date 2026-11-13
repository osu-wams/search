import React from 'react';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

window.matchMedia = () => ({ 
  addEventListener: () => {}, 
  removeEventListener: () => {},
  addListener: () => {}, 
  removeListener: () => {},
  matches: false,
  media: "test",
  onchange: () => {},
  dispatchEvent: (event: Event) => {return false}
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  act(() => root.render(<App />));
  act(() => root.unmount());
});
