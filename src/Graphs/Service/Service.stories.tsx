import React from 'react';
import { storiesOf } from '@storybook/react';
import * as Service from './Service';
import { actions } from '@storybook/addon-actions';

storiesOf('Graphs', module).add('Service Graph', () => {
	let actionEvents = actions('onSelected');
	let testServices: Service.Props = {
		service: {
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
		}
	};

	return <Service.Component {...testServices} />;
});
