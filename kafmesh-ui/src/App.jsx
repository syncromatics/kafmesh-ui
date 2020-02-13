import React from 'react';
import styled from 'styled-components';

const PrettyColor = styled.span`
  color: red;
`;

function App() {
  return (
    <div>
      <PrettyColor>hello </PrettyColor>from App
    </div>
  );
}

export default App;
