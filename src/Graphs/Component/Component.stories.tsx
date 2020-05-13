import React from 'react';
import { storiesOf } from '@storybook/react';
import * as Service from './Component';
import apolloStorybookDecorator from 'apollo-storybook-react';
import typeDefs from '../../schema';
import { ApolloProvider } from '@apollo/react-hooks';

const mocks = {
	Query: () => {
		return {
			componentById: (parent, { id }) => {
				if (id != 12) return 'boom';
				return {
					id: 1,
					name: 'component 1',
					sources: [
						{
							id: 1,
							topic: {
								id: 1,
								name: 'service.id.message1'
							}
						},
						{
							id: 2,
							topic: {
								id: 2,
								name: 'service.serial.message1'
							}
						}
					],
					processors: [
						{
							id: 1,
							name: 'processor 1',
							inputs: [
								{
									id: 1,
									topic: {
										id: 1,
										name: 'service.id.message1'
									}
								}
							],
							outputs: [
								{
									id: 1,
									topic: {
										id: 3,
										name: 'service.id.message2'
									}
								}
							],
							lookups: [],
							joins: []
						},
						{
							id: 4,
							name: 'processor 2',
							inputs: [
								{
									id: 2,
									topic: {
										id: 3,
										name: 'service.id.message'
									}
								}
							],
							outputs: [
								{
									id: 2,
									topic: {
										id: 4,
										name: 'service.id.message3'
									}
								}
							],
							lookups: [],
							joins: [
								{
									id: 1,
									topic: {
										id: 3,
										name: 'service.id.message2'
									}
								}
							]
						}
					],
					views: [],
					sinks: [],
					viewSinks: [],
					viewSources: []
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
	.add('Component Graph', () => {
		let testServices: Service.Props = {
			component: 12,
			onItemSelected: (item) => {}
		};

		return <Service.Component {...testServices} />;
	});
