import React from 'react';
import styled from 'styled-components';
import { Color } from '../theme';

const ResultsWrapper = styled.div`
  display: none;
  width: 50%;
  background: ${Color['orange-400']};
  padding: 2rem;
`;
const Results: React.FC = () => {
  return (
    <ResultsWrapper>
      <div className="gcse-searchresults-only" data-personalizedads="false"></div>
    </ResultsWrapper>
  );
};

export default Results;
