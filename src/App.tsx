import React from 'react';
import styled from 'styled-components';
import Search from './ui/Search';
import Results from './features/Results';
import People from './ui/People';
import Places from './ui/Places';
import Tophat from './ui/Tophat';
import Footer from './ui/Footer';
import { Color, breakpoints, theme } from './theme';
import backgroundImage from './assets/images/Lester_060517_0205.jpg';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
    url(${backgroundImage});
  background-color: ${Color['neutral-100']};
  background-repeat: no-repeat;
  background-size: cover;
`;

const ResultsPage = styled(Page)`
  background-image: none;
`;

const Content = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.unit * 2}px;
  @media screen and (min-width: ${breakpoints[768]}) {
    width: 768px;
  }
`;

const ResultsContent = styled(Content)`
  display: grid;
  height: auto;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
    grid-column-gap: ${theme.spacing.unit * 2}px;
    grid-auto-flow: dense;
    .row-span-3 {
      grid-row: span 3;
    }
    & > * {
      grid-column: 2;
    }
    & > .left {
      grid-column: 1;
    }
  }
`;

const SearchBackground = styled.div`
  background-color: ${Color.black};
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SearchText = styled.h2`
  font-weight: 700;
  font-size: ${theme.fontSize[28]};
  color: ${Color.white};
  margin: 0;
  margin-bottom: ${theme.spacing.unit * 2}px;
  @media screen and (min-width: ${breakpoints[768]}) {
    font-size: ${theme.fontSize[48]};
    margin-bottom: ${theme.spacing.unit * 4}px;
  }
`;

const App: React.FC = () => {
  return (
    <>
      {!window.location.search.startsWith('?q=') && (
        <Page className="App">
          <Tophat />
          <Content>
            <SearchText>Find pages, people and places at Oregon State University</SearchText>
            <Search />
          </Content>
          <Footer />
        </Page>
      )}
      {window.location.search.startsWith('?q=') && (
        <ResultsPage className="App">
          <Tophat />
          <SearchBackground>
            <Search />
          </SearchBackground>
          <ResultsContent>
            <People />
            <Places />
            <Results />
          </ResultsContent>
          <Footer />
        </ResultsPage>
      )}
    </>
  );
};

export default App;
