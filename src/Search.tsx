import React, { useState } from "react";
import { faArrowRight } from "@fortawesome/pro-light-svg-icons";
import SearchBar from "./SearchBar";
import StyledButton from "./StyledButton";
import Icon from "./Icon";
import { Color } from "./theme";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");

  const setUrl = (e: any) => {
    e.preventDefault();
    if (query !== "") {
      window.location.search = "?q=" + query;
    }
  };

  return (
    <form onSubmit={setUrl}>
      <SearchBar setQuery={setQuery} />
      <StyledButton type="submit">
        Search OSU
        <Icon icon={faArrowRight} color={Color["orange-200"]} />
      </StyledButton>
    </form>
  );
};

export default Search;
