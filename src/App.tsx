import React from 'react';
import './App.css';
import SearchBar from './SearchBar';
import SearchButton from './SearchButton';

const App: React.FC = () => {
  return (
    <div className="App">
      <SearchBar />
      <SearchButton> Search OSU -></SearchButton>
    </div>
  );
}

export default App;
