import React from 'react';
import styled from 'styled-components';

const ResultsWrapper = styled.div`
  width: 50%;
  border-radius: 25px;
  background: #73ad21;
  padding: 20px;
`;
const Results: React.FC = () => {
  return (
    <ResultsWrapper>
      <div className="gcse-searchresults-only" data-personalizedads="false"></div>
    </ResultsWrapper>
  );
};

export default Results;
