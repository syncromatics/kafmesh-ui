import React from 'react';
import { storiesOf } from '@storybook/react';
import * as Components from './Components';
import { actions } from '@storybook/addon-actions';
import apolloStorybookDecorator from 'apollo-storybook-react';
import typeDefs from '../../schema';
import { ApolloProvider } from '@apollo/react-hooks';

const mocks = {
	Query: () => {
		return {
			serviceById: (_, { id }) => {
				if (id != 12) return 'boom';
				return {
					components: [
						{
							id: 1,
							name: 'component 1',
							dependsOn: []
						},
						{
							id: 2,
							name: 'component 2',
							dependsOn: [
								{
									id: 1,
									service: {
										id: 12
									}
								}
							]
						},
						{
							id: 3,
							name: 'component 3',
							dependsOn: [
								{
									id: 1,
									service: {
										id: 12
									}
								},
								{
									id: 2,
									service: {
										id: 12
									}
								},
								{
									id: 5,
									service: {
										id: 121
									}
								}
							]
						}
					]
				};
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
	.add('Components Graph', () => {
		let actionEvents = actions('onSelected');
		let testServices: Components.Props = {
			service: 12,
			onItemSelected(event: Components.itemSelectedEvent): void {
				actionEvents.onSelected(event);
			}
		};

		return <Components.Component {...testServices} />;
	});
