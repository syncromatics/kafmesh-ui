import React from 'react';
import { storiesOf } from '@storybook/react';
import * as Services from './Services';

storiesOf('Graphs', module).add('Service Graph', () => {
	let testServices: Services.Props = {
		services: [
			{
				id: 1,
				name: 'Telemetry Service'
			},
			{
				id: 2,
				name: 'Vehicles Service'
			},
			{
				id: 3,
				name: 'Signs Service'
			},
			{
				id: 4,
				name: 'Speed Service'
			}
		],

		connections: [
			{
				from: 1,
				to: 2
			},
			{
				from: 2,
				to: 1
			},
			{
				from: 1,
				to: 4
			},
			{
				from: 2,
				to: 3
			}
		]
	};

	return <Services.Graph services={testServices.services} connections={testServices.connections} />;
});
