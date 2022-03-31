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
  &.results {
    background-image: none;
  }
`;

const Content = styled.main`
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

const ResultsContent = styled.main`
  display: grid;
  width: 100%;
  height: 100%;
  padding: ${theme.spacing.unit * 2}px;
  grid-template-columns: 1fr;
  grid-row-gap: ${theme.spacing.unit * 2}px;
  @media screen and (min-width: ${breakpoints[1024]}) {
    width: 1024px;
    grid-template-columns: auto ${theme.spacing.unit * 30}px;
    grid-auto-rows: min-content;
    grid-column-gap: ${theme.spacing.unit * 2}px;
    grid-auto-flow: dense;
    align-items: flex-start;
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

const SearchBackground = styled.nav`
  background-color: ${Color['orange-400']};
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 ${theme.spacing.unit * 2}px;
`;

const SearchText = styled.h2`
  max-width: 100%;
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

const locationSearch = () => {
  return window.location.search.startsWith('?q=');
};

const mainClasses = () => {
  const app = 'App';
  return locationSearch() ? `${app} results` : app;
};

// Attach  gcse script to head later to prevent race condition between script and results div
const loadGcseScript = () => {
  const script = document.createElement("script");
  script.src = "https://cse.google.com/cse.js?cx=001157565620839607635:f_5ovr-jasm";
  script.async = true;
  document.head.appendChild(script);
}

// Landing Page Content
const LandingPage: React.FC = () => (
  <Content>
    <SearchText>Find pages, people and places at Oregon State University</SearchText>
    <Search />
  </Content>
);

// Results page (primary way users experience the search)
const ResultsPage: React.FC = () => (
  <>
    <SearchBackground>
      <Search />
    </SearchBackground>
    <ResultsContent>
      <Results />
      <People query={decodeURI(window.location.search.substr(3))} />
      <Places query={decodeURI(window.location.search.substr(3))} />
    </ResultsContent>
  </>
);

const App: React.FC = () => {
  loadGcseScript();
  return (
    <Page className={mainClasses()}>
      <Tophat />
      {locationSearch() ? <ResultsPage /> : <LandingPage />}
      <Footer />
    </Page>
  );
};

export default App;
