import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { useRef, useEffect } from '@storybook/addons';

const layout = { name: 'cose' };

type Service = {
	id: number;
	name: string;
};

type ServiceConnection = {
	from: number;
	to: number;
};

export type Props = {
	services: Array<Service>;
	connections: Array<ServiceConnection>;
};

export const Graph: React.FC<Props> = ({ services, connections }) => {
	let elements: any[] = [];

	services.forEach((element) => {
		elements = elements.concat({ data: { id: element.id, label: element.name } });
	});
	connections.forEach((element) => {
		elements = elements.concat({ data: { source: element.from, target: element.to } });
	});

	let wireUpEvents = (cy) => {
		cy.on('tapselect', ({ target }) => {
			alert('here');
		});
	};

	return (
		<CytoscapeComponent
			elements={elements}
			layout={layout}
			style={{ fit: true, width: window.innerWidth, height: window.innerHeight }}
			userZoomingEnabled={false}
			userPanningEnabled={false}
			cy={(cy) => wireUpEvents(cy)}
			stylesheet={[
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
			]}
		/>
	);
};
