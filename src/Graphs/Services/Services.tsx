import React, { FunctionComponent } from 'react';
import { style } from './styles';
import * as Graph from '../Graph/Graph';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const layout: Graph.coseLayout = { name: 'cose', animate: false };

const serviceNode = (service: Service): Graph.node => {
	return { type: 'node', id: String(service.id), label: service.name };
};

const dependencyEdge = (service: Service, dependency: number): Graph.edge => {
	return { type: 'edge', source: String(dependency), target: String(service.id) };
};

const dependencyEdges = (service: Service): Graph.edge[] => {
	return service.dependsOn.map((dependency) => {
		return dependencyEdge(service, dependency.id);
	});
};

const serviceReducer = (service: Service): (Graph.node | Graph.edge)[] => {
	const items: (Graph.node | Graph.edge)[] = [ serviceNode(service) ];
	return items.concat(dependencyEdges(service));
};

const mapper = (services: Array<Service>): Graph.item[] => {
	return services.map(serviceReducer).reduce((a, b) => a.concat(b)).map((item) => {
		return {
			data: item
		};
	});
};

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

export type itemSelectedEvent = {
	item: serviceItem | dependencyItem | noneItem;
};

export const ALL_SERVICES_QUERY = gql`
	query All_Services_Query {
		services {
			id
			name
			dependsOn {
				id
			}
		}
	}
`;

export interface Data {
	services: Array<Service>;
}

interface Service {
	id: number;
	name: string;
	dependsOn: Array<Dependency>;
}

interface Dependency {
	id: number;
}

export type Props = {
	onItemSelected(event: itemSelectedEvent): void;
};

export const Component: FunctionComponent<Props> = ({ onItemSelected }) => {
	const { loading, data } = useQuery<Data, any>(ALL_SERVICES_QUERY);

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
