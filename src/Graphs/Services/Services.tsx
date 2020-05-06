import React, { FunctionComponent, useState, useEffect, createRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { style } from './styles';

const layout = { name: 'cose', animate: false };

type item = {
	data: node | edge;
};

type node = {
	id: number;
	label: string;
};

type edge = {
	source: number;
	target: number;
};

type Service = {
	id: number;
	name: string;
	dependsOn: Array<number>;
};

const serviceNode = (service: Service): node => {
	return { id: service.id, label: service.name };
};

const dependencyEdge = (service: Service, dependency: number): edge => {
	return { source: dependency, target: service.id };
};

const dependencyEdges = (service: Service): edge[] => {
	return service.dependsOn.map((dependency) => {
		return dependencyEdge(service, dependency);
	});
};

const serviceReducer = (service: Service): (node | edge)[] => {
	let items: (node | edge)[] = [ serviceNode(service) ];
	return items.concat(dependencyEdges(service));
};

const mapper = (services: Array<Service>): item[] => {
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
	const [ dimensions, setDimensions ] = useState({
		height: window.innerHeight,
		width: window.innerWidth
	});

	let cyApi: any = createRef();

	useEffect(() => {
		function handleResize() {
			setDimensions({
				height: window.innerHeight,
				width: window.innerWidth
			});
		}
		window.addEventListener('resize', handleResize);
	});

	useEffect(
		() => {
			if (!cyApi) {
				return;
			}

			cyApi.removeAllListeners();

			cyApi.on('click', 'node', ({ target }) => {
				onServiceClicked(Number(target.data().id));
			});

			cyApi.on('click', 'edge', ({ target }) => {
				onDependencyClicked(Number(target.data().source), Number(target.data().target));
			});
		},
		[ cyApi, onServiceClicked, onDependencyClicked ]
	);

	const elements = mapper(services);

	return (
		<CytoscapeComponent
			elements={elements}
			layout={layout}
			style={{ fit: true, width: dimensions.width, height: dimensions.height }}
			userZoomingEnabled={false}
			userPanningEnabled={false}
			cy={(cy: any) => {
				cyApi = cy;
			}}
			stylesheet={style}
		/>
	);
};
