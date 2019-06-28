import React from 'react';
import styled from 'styled-components';
import Search from './Search';
import Results from './Results';
import Tophat from './Tophat';
import { Color, breakpoints } from './theme';
import backgroundImage from './assets/images/Lester_060517_0205.jpg';

const Page = styled.div`
  height: 100vh;
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

const Content = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  @media screen and (min-width: ${breakpoints[768]}) {
    width: 768px;
  }
`;

const App: React.FC = () => {
  return (
    <Page className="App">
      <Content>
        <Tophat />
        <Search />
        <Results />
      </Content>
    </Page>
  );
};

export default App;
