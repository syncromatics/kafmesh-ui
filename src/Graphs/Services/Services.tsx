import React, { FunctionComponent } from 'react';
import { style } from './styles';
import * as Graph from '../Graph/Graph';

const layout = { name: 'cose', animate: false };

type Service = {
	id: number;
	name: string;
	dependsOn: Array<number>;
};

const serviceNode = (service: Service): Graph.node => {
	return { type: 'node', id: service.id, label: service.name };
};

const dependencyEdge = (service: Service, dependency: number): Graph.edge => {
	return { type: 'edge', source: dependency, target: service.id };
};

const dependencyEdges = (service: Service): Graph.edge[] => {
	return service.dependsOn.map((dependency) => {
		return dependencyEdge(service, dependency);
	});
};

const serviceReducer = (service: Service): (Graph.node | Graph.edge)[] => {
	const items: (Graph.node | Graph.edge)[] = [ serviceNode(service) ];
	return items.concat(dependencyEdges(service));
};

const mapper = (services: Array<Service>): Graph.item[] => {
	return services
		.map(serviceReducer)
		.reduce((a, b) => {
			return a.concat(b);
		})
		.map((item) => {
			return {
				data: item
			};
		});
};

export type Props = {
	services: Array<Service>;
	onServiceClicked(serviceId: number): void;
	onDependencyClicked(from: number, to: number): void;
};

export const Component: FunctionComponent<Props> = ({ services, onServiceClicked, onDependencyClicked }) => {
	const onItemSelected = (event: Graph.itemSelectEvent) => {
		switch (event.item.type) {
			case 'node':
				onServiceClicked(event.item.id);
				break;
			case 'edge':
				onDependencyClicked(event.item.source, event.item.target);
				break;
		}
	};

	const elements = mapper(services);

	return (
		<Graph.Component
			elements={elements}
			layout={layout}
			zoomingEnabled={false}
			panningEnabled={false}
			stylesheet={style}
			onItemSelected={onItemSelected}
		/>
	);
};
