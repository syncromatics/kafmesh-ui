const dummyElements = [
  { data: { id: 'master' } },
  { data: { id: 'masterComp', parent: 'master', description: 'hellloooooooooooooo' } },
  {
    data: {
      id: 'masterReverb',
      parent: 'master',
      description: 'This is a node which processes a bunch of data is really fascinating ways',
    },
  },
  {
    data: {
      id: 'masterLimiter',
      parent: 'master',
      description: 'This is a node which processes a bunch of dataasdfly fascinating ways',
    },
  },
  {
    data: {
      id: 'masterOut',
      parent: 'master',
      description: 'This is a node which processes a bunch of data is really fascinating ways',
    },
  },

  { data: { id: 'main' } },
  {
    data: {
      id: 'oscillator',
      parent: 'main',
      shape: 'triangle',
      description: 'This is a node which processes a bunch of data is really fascinating ways',
    },
  },
  {
    data: {
      id: 'filter1',
      parent: 'main',
      shape: 'triangle',
      description: 'Thasdf which processes a bunch of data is really fascinating ways',
    },
  },
  {
    data: {
      id: 'filter2',
      parent: 'main',
      shape: 'triangle',
      description: 'This is a node which processes asdfasdfasdfta is really fascinating ways',
    },
  },
  {
    data: {
      id: 'envelope',
      parent: 'main',
      shape: 'triangle',
      description: 'This is a node which processes a bunch of data is really fascasdf ways',
    },
  },
  {
    data: {
      id: 'volume',
      parent: 'main',
      shape: 'triangle',
      description: 'This isasdfch processes a bunch of data is really fascinating ways',
    },
  },

  { data: { id: 'modulation1' } },
  {
    data: {
      id: 'mod1In',
      parent: 'modulation1',
      description: 'This is a node which processes a bunch of data is really fascinating ways',
    },
  },
  {
    data: {
      id: 'mod1Scale',
      parent: 'modulation1',
      description: 'This is a asdfasdfes a bunch of data is really fascinating ways',
    },
  },
  {
    data: {
      id: 'mod1Ratio',
      parent: 'modulation1',
      description: 'This is a node which processes a bunch of data is really fascinating ways',
    },
  },
  {
    data: {
      id: 'mod1Mul',
      parent: 'modulation1',
      description: 'This is a node which processes a bunch of data is really fasasdfing ways',
    },
  },
  {
    data: {
      id: 'mod1Out',
      parent: 'modulation1',
      description: 'This is a node which processes a bunch of data is really fascinating ways',
    },
  },

  { data: { id: 'aux' } },
  {
    data: {
      id: 'modulation2',
      parent: 'modulation2',
      description: 'This iasdfasdfses a bunch of data is really fascinating ways',
    },
  },
  {
    data: {
      id: 'mod2In',
      parent: 'aux',
      description: 'This is a node which processes a bunch of data is really fascinating ways',
    },
  },
  {
    data: {
      id: 'mod2Scale',
      parent: 'modulation2',
      shape: 'triangle',
      description: 'This is a node which processes a bunch of data is really fascinating ways',
    },
  },
  {
    data: {
      id: 'mod2Ratio',
      parent: 'modulation2',
      shape: 'triangle',
      description: 'This is a node which processes a bunch of data is really fascinating ways',
    },
  },
  {
    data: {
      id: 'mod2Mul',
      parent: 'modulation2',
      shape: 'triangle',
      description: 'This is a node which processes a bunch of dataasdfasdfnating ways',
    },
  },
  {
    data: {
      id: 'mod2Out',
      parent: 'modulation2',
      shape: 'triangle',
      description: 'Thisasdfde which processes a bunch of data is really fascinating ways',
    },
  },

  // Edges

  {
    data: { id: 'w0', source: 'oscillator', target: 'filter1', label: 'Edge from Node1 to Node2' },
  },
  {
    data: { id: 'w1', source: 'oscillator', target: 'filter2', label: 'Edge from Node1 to Node2' },
  },
  { data: { id: 'w2', source: 'filter1', target: 'envelope', label: 'Edge from Node1 to Node2' } },
  { data: { id: 'w3', source: 'filter2', target: 'envelope', label: 'Edge from Node1 to Node2' } },
  { data: { id: 'w4', source: 'envelope', target: 'volume', label: 'Edge from Node1 to Node2' } },

  { data: { id: 'w5', source: 'mod1In', target: 'mod1Scale' } },
  { data: { id: 'w6', source: 'mod2In', target: 'mod2Scale' } },
  { data: { id: 'w7', source: 'mod1Scale', target: 'mod1Ratio' } },
  { data: { id: 'w8', source: 'mod2Scale', target: 'mod2Ratio' } },
  { data: { id: 'w9', source: 'mod1Ratio', target: 'mod2Scale' } },
  { data: { id: 'w10', source: 'mod2Ratio', target: 'mod2Scale' } },
  { data: { id: 'w11', source: 'mod1Mul', target: 'mod1Out' } },
  { data: { id: 'w12', source: 'mod2Mul', target: 'mod2Out' } },

  { data: { id: 'w13', source: 'masterComp', target: 'masterReverb' } },
  { data: { id: 'w14', source: 'masterReverb', target: 'masterLimiter' } },
  { data: { id: 'w15', source: 'masterLimiter', target: 'masterOut' } },

  { data: { id: 'w16', source: 'volume', target: 'masterComp' } },
  { data: { id: 'w17', source: 'mod1Out', target: 'filter1' } },

  { data: { id: 'w18', source: 'mod1Out', target: 'filter2' } },
  { data: { id: 'w19', source: 'mod2Out', target: 'envelope' } },
];

export default dummyElements;
