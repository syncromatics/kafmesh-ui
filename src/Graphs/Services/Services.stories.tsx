import React from 'react';
import { storiesOf } from '@storybook/react';
import * as Services from './Services';

storiesOf('Graphs', module).add('Service Graph', () => {
	let testServices: Services.Props = {
		services: [
			{
				id: 1,
				name: 'Telemetry Service',
				dependsOn: [ 2 ]
			},
			{
				id: 2,
				name: 'Vehicles Service',
				dependsOn: [ 1 ]
			},
			{
				id: 3,
				name: 'Signs Service',
				dependsOn: [ 2 ]
			},
			{
				id: 4,
				name: 'Speed Service',
				dependsOn: [ 1, 2 ]
			}
		],
		serviceClicked(id: number): void {
			alert('Service clicked: ' + id);
		},
		edgeClicked(from: number, to: number): void {
			alert('dependency clicked: from ' + from + ' to ' + to);
		}
	};

	return (
		<Services.Graph
			services={testServices.services}
			serviceClicked={testServices.serviceClicked}
			edgeClicked={testServices.edgeClicked}
		/>
	);
});
