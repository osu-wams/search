import React from 'react';
import './App.css';
import Search from './Search';
import Results from './Results';
import Tophat from './Tophat';

const App: React.FC = () => {
  return (
    <div className="App">
      <Tophat />
      <Search />
      <Results />
    </div>
  );
};

export default App;
