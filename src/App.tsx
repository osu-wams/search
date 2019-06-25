import React, { useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import Search from "./Search";

const Results = styled.div``;

const App: React.FC = () => {
  useEffect(() => {
    if (!window.location.search.startsWith("?q=")) {
      window.location.search = "?q=hello";
    }
    const cx = "001157565620839607635:f_5ovr-jasm";
    const gcse = document.createElement("script");
    gcse.src = "https://cse.google.com/cse.js?cx=" + cx;
    gcse.async = true;
    document.head.appendChild(gcse);
  }, []);

  return (
    <div className="App">
      <Search />
      <Results
        className="gcse-searchresults-only"
        data-personalizedads="false"
      ></Results>
    </div>
  );
};

export default App;
