export const style = [
	{
		selector: 'node',
		style: {
			width: 100,
			height: 50,
			shape: 'rectangle',
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
		selector: 'edge',
		style: {
			width: 2,
			'line-color': 'black',
			'curve-style': 'bezier',
			'target-arrow-shape': 'triangle',
			'target-arrow-color': 'black'
		}
	}
];
