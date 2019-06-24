import React from 'react';
import styled from 'styled-components';

const SearchBar: React.FC = () => {
  return(
    <div>
      <input type="text" placeholder="Search for..."/>
      <span>
        <button>
          Icon Goes Here!!!
        </button>
      </span>
    </div>
  );
};

export default SearchBar;