import React from 'react';
import ReactDOM from 'react-dom';
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
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
