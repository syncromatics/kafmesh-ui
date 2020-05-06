import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { useRef, useEffect } from '@storybook/addons';

const layout = { name: 'cose', animate: false };

type Service = {
	id: number;
	name: string;
	dependsOn: Array<number>;
};

export type Props = {
	services: Array<Service>;
	serviceClicked(serviceId: number): void;
	edgeClicked(from: number, to: number): void;
};

export const Graph: React.FC<Props> = ({ services, serviceClicked, edgeClicked }) => {
	let elements: any[] = [];

	services.forEach((service) => {
		elements = elements.concat({ data: { id: service.id, label: service.name } });
		service.dependsOn.forEach((dependency) => {
			elements = elements.concat({ data: { source: dependency, target: service.id } });
		});
	});

	let wireUpEvents = (cy) => {
		cy.on('tapselect', ({ target }) => {
			switch (target.group()) {
				case 'edges':
					edgeClicked(target.data().source, target.data().target);
					break;
				case 'nodes':
					serviceClicked(target.data().id);
					break;
			}
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
