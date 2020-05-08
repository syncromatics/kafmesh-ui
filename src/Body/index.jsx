import React from 'react';
import styled from 'styled-components';

import ViewPort from './ViewPort';
import InfoPanel from './InfoPanel';

const BodyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

// Flex # corresponds to vertical section divider location
const Body = () => (
  <BodyContainer>
    <ViewPort flex={3} />
    <InfoPanel flex={1} />
  </BodyContainer>
);

export default Body;
