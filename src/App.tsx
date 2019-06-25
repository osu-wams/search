import React, { useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import Search from "./Search";

const App: React.FC = () => {
  useEffect(() => {
    if (!window.location.search.startsWith("?q=")) {
      window.location.search = "?q=hello";
    }
  }, []);

  return (
    <div className="App">
      <Search />
      <div
        className="gcse-searchresults-only"
        data-personalizedads="false"
      ></div>
    </div>
  );
};

export default App;
