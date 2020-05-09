import React, { FunctionComponent } from 'react';
import { style } from './styles';
import * as Graph from '../Graph/Graph';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const query = gql`
	query serviceById($id: ID!) {
		serviceById(id: $id) {
			components {
				id
				name
				description
				dependsOn {
					id
					service {
						id
					}
				}
			}
		}
	}
`;

interface data {
	serviceById: service;
}

interface variables {
	id: number;
}

interface service {
	id: number;
	name: string;
	components: Array<component>;
}

interface component {
	id: number;
	name: string;
	description: string;
	dependsOn: Array<componentDependency>;
}

interface componentDependency {
	id: number;
	service: componentDependencyService;
}

interface componentDependencyService {
	id: number;
}

export type Props = {
	service: number;
	onItemSelected(event: itemSelectedEvent): void;
};

export const Component: FunctionComponent<Props> = ({ service, onItemSelected }) => {
	const { loading, data, error } = useQuery<data, variables>(query, {
		variables: {
			id: service
		}
	});

	if (error) {
		return (
			<div style={{ width: '100%', height: '100%' }}>
				{error.name} : {error.message}
			</div>
		);
	}
	if (loading) {
		return <div style={{ width: '100%', height: '100%' }}>Loading</div>;
	}
	if (data.serviceById == null) {
		return <div style={{ width: '100%', height: '100%' }}>service {service} not found.</div>;
	}

	const handleSelect = (event: Graph.itemSelectEvent) => {
		switch (event.item.type) {
			case 'node':
				onItemSelected({
					item: {
						type: 'component',
						id: Number(event.item.id)
					}
				});
				break;
			case 'none':
				onItemSelected({
					item: {
						type: 'none'
					}
				});
				break;
		}
	};

	const nodes = data.serviceById.components.map((item): Graph.item => {
		return {
			data: {
				type: 'node',
				id: String(item.id),
				label: item.name
			}
		};
	});

	const edges = data.serviceById.components
		.map((item) => {
			return item.dependsOn
				.filter((dependency) => dependency.service.id == service)
				.map((dependency): Graph.item => {
					return {
						data: {
							type: 'edge',
							source: String(dependency.id),
							target: String(item.id)
						}
					};
				});
		})
		.reduce(function(a, b) {
			return a.concat(b);
		});

	const elements = nodes.concat(edges);

	return (
		<Graph.Component
			elements={elements}
			layout={layout}
			zoomingEnabled={false}
			panningEnabled={false}
			stylesheet={style}
			onItemSelected={handleSelect}
		/>
	);
};

export type itemSelectedEvent = {
	item: componentItem | noneItem;
};

const layout: Graph.coseLayout = { name: 'cose', animate: false };

type componentItem = {
	type: 'component';
	id: number;
};

type noneItem = {
	type: 'none';
};
