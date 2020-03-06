export const graphLayout = { name: 'cose-bilkent', animate: false };

export const graphStyle = [
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
