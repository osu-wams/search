import React from "react";
import "./App.css";
import Search from "./Search";
import Results from "./Results";

const App: React.FC = () => {
  return (
    <div className="App">
      <Search />
      <Results />
    </div>
  );
};

export default App;
