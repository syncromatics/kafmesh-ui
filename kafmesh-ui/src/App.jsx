import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AppItems = styled.span`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => (
  <>
    <GlobalStyles />
    <AppContainer>
      <AppItems>
        <Header />
        <Body />
        <Footer />
      </AppItems>
    </AppContainer>
  </>
);

export default App;
