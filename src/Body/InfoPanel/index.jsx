import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../../styles/Colors';

const propTypes = { flex: PropTypes.number };

const InfoPanelContainer = styled.div`
  width: 100%;
  display: flex;
  flex: ${({ flex }) => flex};
  flex-direction: column;
  border: 1px solid ${color.borderSimple};
  background-color: ${color.foreground};
  overflow-wrap: break-word;
  word-break: break-word;
`;

const InfoPanel = ({ flex = 1 }) => {
  return <InfoPanelContainer flex={flex} />;
};

InfoPanel.propTypes = propTypes;
export default InfoPanel;
