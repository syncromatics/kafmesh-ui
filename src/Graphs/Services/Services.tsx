import React, { FunctionComponent } from 'react';
import { style } from './styles';
import * as Graph from '../Graph/Graph';

const layout: Graph.coseLayout = { name: 'cose', animate: false };

type Service = {
	id: number;
	name: string;
	dependsOn: Array<number>;
};

const serviceNode = (service: Service): Graph.node => {
	return { type: 'node', id: String(service.id), label: service.name };
};

const dependencyEdge = (service: Service, dependency: number): Graph.edge => {
	return { type: 'edge', source: String(dependency), target: String(service.id) };
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

export type Props = {
	services: Array<Service>;
	onItemSelected(event: itemSelectedEvent): void;
};

export const Component: FunctionComponent<Props> = ({ services, onItemSelected }) => {
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

	const elements = mapper(services);

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
