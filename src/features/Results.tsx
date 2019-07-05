import React from 'react';
import styled from 'styled-components';
import { Color, theme } from '../theme';
import Card from '../ui/Card';

const ResultsTitle = styled.h2`
  font-weight: 300;
  color: ${Color['neutral-600']};
  font-size: ${theme.fontSize[18]};
  padding: 1em 0 0 1em;
  margin: 0;
`;

const Results: React.FC = () => {
  return (
    <Card className="row-span-3 left">
      <ResultsTitle>Search Results</ResultsTitle>
      <div className="gcse-searchresults-only" data-personalizedads="false"></div>
    </Card>
  );
};

export default Results;
