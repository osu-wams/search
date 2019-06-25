import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import StyledButton from "./StyledButton";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");

  const setUrl = (e: any) => {
    e.preventDefault();
    window.location.search = "?q=" + query;
  };

  return (
    <form onSubmit={setUrl}>
      <SearchBar setQuery={setQuery} />
      <StyledButton type="submit">Search OSU -></StyledButton>
    </form>
  );
};

export default Search;
