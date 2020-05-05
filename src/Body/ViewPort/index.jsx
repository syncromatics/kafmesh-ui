import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../../styles/Colors';

import GraphVisualizer from './GraphVisualizer';

const propTypes = { flex: PropTypes.number };

const ViewPortContainer = styled.div`
  flex: ${({ flex }) => flex};
  display: flex;
  flex-direction: column;
  border: 1px solid ${color.borderSimple};
  margin-right: 20px;
  background-color: ${color.foreground};
`;

const ViewPort = ({ flex = 3 }) => (
  <ViewPortContainer flex={flex}>
    <GraphVisualizer />
  </ViewPortContainer>
);

ViewPort.propTypes = propTypes;
export default ViewPort;
