import React, { FunctionComponent, useState, useEffect, createRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';
import Cytoscape from 'cytoscape';

Cytoscape.use(COSEBilkent);

export type item = {
	data: node | edge;
	classes?: string;
};

export type layout = concentricLayout | coseLayout | circleLayout | coseBilkentLayout;

export type concentricLayout = {
	name: 'concentric';
	animate: boolean;
	avoidOverlap: boolean;
	nodeDimensionsIncludeLabels: boolean;
};

export type circleLayout = {
	name: 'circle';
	animate: boolean;
	avoidOverlap: boolean;
	nodeDimensionsIncludeLabels: boolean;
};

export type coseBilkentLayout = {
	name: 'cose-bilkent';
};

export type coseLayout = {
	name: 'cose';
	animate?: boolean;
};

export type none = {
	type: 'none';
};

export type node = {
	type: 'node';
	id: string;
	label: string;
	parent?: string;
};

export type edge = {
	type: 'edge';
	source: string;
	target: string;
};

export type itemSelectEvent = {
	item: edge | node | none;
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
			if (cyApi == null) {
				return;
			}

			cyApi.removeAllListeners();

			cyApi.on('select', 'node', ({ target }) => {
				onItemSelected({
					item: {
						type: 'node',
						id: target.data().id,
						label: target.data().label
					}
				});
			});

			cyApi.on('select', 'edge', ({ target }) => {
				onItemSelected({
					item: {
						type: 'edge',
						source: target.data().source,
						target: target.data().target
					}
				});
			});

			cyApi.on('unselect', () => {
				onItemSelected({
					item: {
						type: 'none'
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
