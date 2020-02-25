import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../../styles/Colors';

const propTypes = { flex: PropTypes.number };

const ViewPortContainer = styled.div`
  display: flex;
  flex: ${({ flex }) => flex};
  flex-direction: column;
  border: 1px solid ${color.borderSimple};
  margin-right: 20px;
`;

const ViewPort = ({ flex = 3 }) => (
  <ViewPortContainer flex={flex}>Hello from ViewPort</ViewPortContainer>
);

ViewPort.propTypes = propTypes;
export default ViewPort;
