import React, { FunctionComponent } from 'react';
import { style } from './styles';
import * as Graph from '../Graph/Graph';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const query = gql`
	{
		services {
			id
			name
			dependsOn {
				id
			}
		}
	}
`;

interface data {
	services: Array<service>;
}

interface service {
	id: number;
	name: string;
	dependsOn: Array<dependency>;
}

interface dependency {
	id: number;
}

export type Props = {
	onItemSelected(event: itemSelectedEvent): void;
};

export const Component: FunctionComponent<Props> = ({ onItemSelected }) => {
	const { loading, data, error } = useQuery<data, any>(query);

	if (error) {
		return (
			<div>
				{error.name} : {error.message}
			</div>
		);
	}
	if (loading) {
		return <div>Loading</div>;
	}

	const handleSelect = (event: Graph.itemSelectEvent) => {
		switch (event.item.type) {
			case 'node':
				onItemSelected({
					item: {
						type: 'service',
						id: Number(event.item.id)
					}
				});
				break;
			case 'edge':
				onItemSelected({
					item: {
						type: 'dependency',
						serviceId: Number(event.item.target),
						dependency: Number(event.item.source)
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

	const elements = mapper(data.services);

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
	item: serviceItem | dependencyItem | noneItem;
};

const layout: Graph.coseLayout = { name: 'cose', animate: false };

type serviceItem = {
	type: 'service';
	id: number;
};

type dependencyItem = {
	type: 'dependency';
	serviceId: number;
	dependency: number;
};

type noneItem = {
	type: 'none';
};

const serviceNode = (service: service): Graph.node => {
	return { type: 'node', id: String(service.id), label: service.name };
};

const dependencyEdge = (service: service, dependency: number): Graph.edge => {
	return { type: 'edge', source: String(dependency), target: String(service.id) };
};

const dependencyEdges = (service: service): Graph.edge[] => {
	return service.dependsOn.map((dependency) => {
		return dependencyEdge(service, dependency.id);
	});
};

const serviceReducer = (service: service): (Graph.node | Graph.edge)[] => {
	const items: (Graph.node | Graph.edge)[] = [ serviceNode(service) ];
	return items.concat(dependencyEdges(service));
};

const mapper = (services: Array<service>): Graph.item[] => {
	return services.map(serviceReducer).reduce((a, b) => a.concat(b)).map((item) => {
		return {
			data: item
		};
	});
};
