import React, { useEffect } from "react";
import "./App.css";
import Search from "./Search";
import Results from "./Results";

const App: React.FC = () => {
  /*
  useEffect(() => {
    if (!window.location.search.startsWith("?q=")) {
      window.location.search = "?q=hello";
    }
  }, []);*/

  return (
    <div className="App">
      <Search />
      <Results />
    </div>
  );
};

export default App;
