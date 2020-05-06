import React, { FunctionComponent, useState, useEffect, createRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

export type item = {
	data: node | edge;
};

export type layout = {
	name: string;
	animate: boolean;
};

export type node = {
	type: 'node';
	id: number;
	label: string;
};

export type edge = {
	type: 'edge';
	source: number;
	target: number;
};

export type itemSelectEvent = {
	item: edge | node;
};

export type Props = {
	layout: layout;
	stylesheet: any;
	elements: item[];
	zoomingEnabled: boolean;
	panningEnabled: boolean;
	onItemSelected(item: itemSelectEvent): void;
};

export const Component: FunctionComponent<Props> = ({
	layout,
	stylesheet,
	elements,
	onItemSelected,
	zoomingEnabled,
	panningEnabled
}) => {
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

			cyApi.on('select', 'node', ({ target }) => {
				onItemSelected({
					item: {
						type: 'node',
						id: +target.data().id,
						label: target.data().label
					}
				});
			});

			cyApi.on('select', 'edge', ({ target }) => {
				onItemSelected({
					item: {
						type: 'edge',
						source: +target.data().source,
						target: +target.data().target
					}
				});
			});
		},
		[ cyApi, onItemSelected ]
	);

	return (
		<CytoscapeComponent
			elements={elements}
			layout={layout}
			style={{ fit: true, width: dimensions.width, height: dimensions.height }}
			userZoomingEnabled={zoomingEnabled}
			userPanningEnabled={panningEnabled}
			boxSelectionEnabled={false}
			cy={(cy: any) => {
				cyApi = cy;
			}}
			stylesheet={stylesheet}
		/>
	);
};
