import { createContext, createElement, useState } from 'react';
import PropTypes from 'prop-types';
import dummyElements from './DummyData';

const KafmeshContext = createContext([{}, () => {}]);

const KafmeshProvider = ({ children }) => {
  const [elements, setElements] = useState(dummyElements); //  All The items in the graph
  const [active, setActive] = useState(null); // The double-clicked element in the graph
  const [selected, setSelected] = useState(null); // The selected element in the graph
  const [hovered, setHovered] = useState(null); // The selected element in the graph
  const state = {
    elements,
    setElements,
    active,
    setActive,
    selected,
    setSelected,
    hovered,
    setHovered,
  };

  return createElement(KafmeshContext.Provider, { value: state }, children);
};

KafmeshProvider.propTypes = { children: PropTypes.node };

export { KafmeshContext, KafmeshProvider };
