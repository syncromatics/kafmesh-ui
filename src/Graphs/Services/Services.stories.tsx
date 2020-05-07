import React from 'react';
import { storiesOf } from '@storybook/react';
import * as Services from './Services';
import { actions } from '@storybook/addon-actions';
import apolloStorybookDecorator from 'apollo-storybook-react';
import typeDefs from '../../schema';
import { ApolloProvider } from '@apollo/react-hooks';

const mocks = {
	Query: () => {
		return {
			services: () => {
				return [
					{
						id: 1,
						name: 'Telemetry Service',
						dependsOn: [ { id: 2 } ]
					},
					{
						id: 2,
						name: 'Vehicles Service',
						dependsOn: [ { id: 1 } ]
					},
					{
						id: 3,
						name: 'Signs Service',
						dependsOn: [ { id: 2 } ]
					},
					{
						id: 4,
						name: 'Speed Service',
						dependsOn: [ { id: 1 }, { id: 2 } ]
					}
				];
			}
		};
	}
};

storiesOf('Graphs', module)
	.addDecorator(
		apolloStorybookDecorator({
			typeDefs,
			mocks,
			Provider: ApolloProvider
		})
	)
	.add('Services Graph', () => {
		let actionEvents = actions('onSelected');
		let testServices: Services.Props = {
			onItemSelected(event: Services.itemSelectedEvent): void {
				actionEvents.onSelected(event);
			}
		};

		return <Services.Component {...testServices} />;
	});
