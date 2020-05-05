import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../../styles/Colors';
import { KafmeshContext } from '../../State';

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
  const { selected, hovered, active } = useContext(KafmeshContext);

  return (
    <InfoPanelContainer flex={flex}>
      {active && JSON.stringify(active.json())}
      <br />
      ---------
      <br />
      {selected && JSON.stringify(selected.json())}
      <br />
      ---------
      <br />
      {hovered && JSON.stringify(hovered.json())}
    </InfoPanelContainer>
  );
};

InfoPanel.propTypes = propTypes;
export default InfoPanel;
