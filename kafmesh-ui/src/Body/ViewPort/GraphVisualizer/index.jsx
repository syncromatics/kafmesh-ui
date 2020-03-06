import React, { useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import CytoscapeComponent from 'react-cytoscapejs';
import { KafmeshContext } from '../../../State';
import { graphStyle, graphLayout } from '../../../styles/GraphStyles';

const GraphVisualizerContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledCytoscapeComponent = styled(CytoscapeComponent)`
  width: 100%;
  height: 100%;
`;

const GraphVisualizer = () => {
  const {
    elements: { loading, error, data: elements },
    setActive,
    setSelected,
    setHovered,
  } = useContext(KafmeshContext);
  let cyRef = useRef(null);
  useEffect(() => () => cyRef.removeAllListeners(), []);

  const onMouseHandler = () => {
    cyRef.on('mouseover', 'node', ({ target }) => setHovered(target));
    cyRef.one('tap', ({ target }) =>
      target.selected && target.selected()
        ? setActive(target)
        : setSelected(target.elements ? null : target)
    );
  };

  return loading || error ? (
    <p>Loading...</p>
  ) : (
    // Event bubbling makes this work ... I assume ... cus it works without error for onMouseOver as well.
    <GraphVisualizerContainer onClick={onMouseHandler}>
      <StyledCytoscapeComponent
        elements={elements}
        layout={graphLayout}
        stylesheet={graphStyle}
        minZoom={1e-1}
        maxZoom={1e1}
        cy={cy => {
          cyRef = cy;
        }}
      />
    </GraphVisualizerContainer>
  );
};

export default GraphVisualizer;
