import React from 'react';
import { storiesOf } from '@storybook/react';
import * as Services from './Services';
import { actions } from '@storybook/addon-actions';

storiesOf('Graphs', module).add('Service Graph', () => {
	let actionEvents = actions('onServiceClicked', 'onDependencyClicked');
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
		onServiceClicked(id: number): void {
			actionEvents.onServiceClicked(id);
		},
		onDependencyClicked(from: number, to: number): void {
			actionEvents.onDependencyClicked(from, to);
		}
	};

	return <Services.Component {...testServices} />;
});
