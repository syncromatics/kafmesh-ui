import React, { useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';
import { KafmeshContext } from '../../../State';

// Graph formatting/styling initialized
Cytoscape.use(COSEBilkent);
const layout = { name: 'cose-bilkent', animate: false };
// the stylesheet for the graph
const style = [
  {
    selector: 'node',
    style: {
      label: 'data(id)',
      shape: el => el.data('shape') || 'ellipse',
      width: 30,
      height: 30,
    },
  },
  {
    selector: 'edge',
    style: {
      'curve-style': 'bezier',
      width: 5,
      'line-color': '#ccc',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle',
    },
  },
];

const GraphVisualizerContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledCytoscapeComponent = styled(CytoscapeComponent)`
  width: 100%;
  height: 100%;
`;

const GraphVisualizer = () => {
  const { elements, setActive, setSelected, setHovered } = useContext(KafmeshContext);
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

  return (
    // Event bubbling makes this work ... I assume ... cus it works without error onMouseOver as well.
    <GraphVisualizerContainer onClick={onMouseHandler}>
      <StyledCytoscapeComponent
        elements={elements}
        layout={layout}
        stylesheet={style}
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
