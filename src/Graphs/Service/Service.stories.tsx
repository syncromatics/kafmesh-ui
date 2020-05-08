import React from 'react';
import { storiesOf } from '@storybook/react';
import * as Service from './Service';
import apolloStorybookDecorator from 'apollo-storybook-react';
import typeDefs from '../../schema';
import { ApolloProvider } from '@apollo/react-hooks';

const mocks = {
	Query: () => {
		return {
			serviceById: (parent, { id }) => {
				if (id != 12) return 'boom';
				return {
					components: [
						{
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
						},
						{
							id: 2,
							name: 'component 2',
							sources: [],
							processors: [
								{
									id: 2,
									name: 'processor 1',
									inputs: [
										{
											id: 3,
											topic: {
												id: 4,
												name: 'service.id.message3'
											}
										}
									],
									outputs: [
										{
											id: 3,
											topic: {
												id: 5,
												name: 'service.id.message5'
											}
										}
									],
									lookups: [],
									joins: []
								}
							],
							views: [],
							sinks: [],
							viewSinks: [],
							viewSources: []
						},
						{
							id: 3,
							name: 'component 3',
							sources: [],
							processors: [],
							views: [
								{
									id: 1,
									topic: {
										id: 6,
										name: 'telemetryService.who.knows'
									}
								}
							],
							sinks: [
								{
									id: 1,
									name: 'sink 1',
									topic: {
										id: 4,
										name: 'service.id.message3'
									}
								}
							],
							viewSinks: [
								{
									id: 1,
									name: 'view sink1',
									topic: {
										id: 5,
										name: 'service.id.message5'
									}
								}
							],
							viewSources: []
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
	.add('Service Graph', () => {
		let testServices: Service.Props = {
			service: 12
		};

		return <Service.Component {...testServices} />;
	});
