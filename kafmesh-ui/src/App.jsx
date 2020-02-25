import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

const PrettyColor = styled.span`
  color: red;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <div>
        <PrettyColor>hello for sure </PrettyColor>from App
      </div>
    </>
  );
}

export default App;
