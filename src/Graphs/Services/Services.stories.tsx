import React from 'react';
import { storiesOf } from '@storybook/react';
import * as Services from './Services';
import { actions } from '@storybook/addon-actions';

storiesOf('Graphs', module).add('Services Graph', () => {
	let actionEvents = actions('onSelected');
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
		onItemSelected(event: Services.itemSelectedEvent): void {
			actionEvents.onSelected(event);
		}
	};

	return <Services.Component {...testServices} />;
});
