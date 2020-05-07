export const style = [
	{
		selector: 'node.processor',
		style: {
			width: 100,
			height: 50,
			shape: 'diamond',
			'background-color': 'white',
			'border-color': 'black',
			'border-width': 2,
			label: 'data(label)',
			'text-halign': 'center',
			'text-valign': 'center',
			'text-max-width': '100px',
			'text-wrap': 'ellipsis',
			'font-size': '12'
		}
	},
	{
		selector: 'node.source',
		style: {
			width: 100,
			height: 50,
			shape: 'triangle',
			'background-color': 'white',
			'border-color': 'black',
			'border-width': 2,
			label: 'data(label)',
			'text-halign': 'center',
			'text-valign': 'center',
			'text-max-width': '100px',
			'text-wrap': 'ellipsis',
			'font-size': '12'
		}
	},
	{
		selector: 'node.sink',
		style: {
			width: 100,
			height: 50,
			shape: 'vee',
			'background-color': 'white',
			'border-color': 'black',
			'border-width': 2,
			label: 'data(label)',
			'text-halign': 'center',
			'text-valign': 'center',
			'text-max-width': '100px',
			'text-wrap': 'ellipsis',
			'font-size': '12'
		}
	},
	{
		selector: 'node.view',
		style: {
			width: 100,
			height: 50,
			shape: 'pentagon',
			'background-color': 'white',
			'border-color': 'black',
			'border-width': 2,
			label: 'data(label)',
			'text-halign': 'center',
			'text-valign': 'center',
			'text-max-width': '100px',
			'text-wrap': 'ellipsis',
			'font-size': '12'
		}
	},
	{
		selector: 'node.viewSink',
		style: {
			width: 100,
			height: 50,
			shape: 'pentagon',
			'background-color': 'white',
			'border-color': 'black',
			'border-width': 2,
			label: 'data(label)',
			'text-halign': 'center',
			'text-valign': 'center',
			'text-max-width': '100px',
			'text-wrap': 'ellipsis',
			'font-size': '12'
		}
	},
	{
		selector: 'node.viewSource',
		style: {
			width: 100,
			height: 50,
			shape: 'pentagon',
			'background-color': 'white',
			'border-color': 'black',
			'border-width': 2,
			label: 'data(label)',
			'text-halign': 'center',
			'text-valign': 'center',
			'text-max-width': '100px',
			'text-wrap': 'ellipsis',
			'font-size': '12'
		}
	},
	{
		selector: 'node.component',
		style: {
			label: 'data(label)',
			shape: 'rectangle'
		}
	},
	{
		selector: 'node.service',
		style: {
			shape: 'rectangle',
			'background-color': 'white'
		}
	},
	{
		selector: 'node.topic',
		style: {
			shape: 'circle',
			'border-color': 'black',
			'border-width': 2
		}
	},
	{
		selector: 'node:selected',
		style: {
			width: 100,
			height: 50,
			shape: 'rectangle',
			'background-color': 'red',
			'border-color': 'black',
			'border-width': 2,
			label: 'data(label)',
			'text-halign': 'center',
			'text-valign': 'center',
			'text-max-width': '100px',
			'text-wrap': 'ellipsis',
			'font-size': '12'
		}
	},
	{
		selector: 'edge',
		style: {
			width: 2,
			'line-color': 'black',
			'curve-style': 'bezier',
			'target-arrow-shape': 'triangle',
			'target-arrow-color': 'black'
		}
	},
	{
		selector: 'edge:selected',
		style: {
			width: 4,
			'line-color': 'red',
			'target-arrow-color': 'red'
		}
	}
];
