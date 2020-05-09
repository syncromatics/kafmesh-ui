import React, { FunctionComponent, useState, useEffect, createRef, useRef, useLayoutEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';
import Cytoscape from 'cytoscape';
import useComponentSize from '@rehooks/component-size';
import { useDebouncedCallback } from 'use-debounce';

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
	animate: boolean;
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
	let cyApi: any = createRef();
	let container = useRef<HTMLDivElement>(null);

	let dimensions = useComponentSize(container);

	const [ redrawGraph ] = useDebouncedCallback(() => {
		if (!cyApi) return;
		cyApi.layout(layout).run();
	}, 100);

	useEffect(
		() => {
			if (!cyApi == null) return;

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

	useEffect(
		() => {
			if (!cyApi) return;
			redrawGraph();
		},
		[ dimensions ]
	);

	return (
		<div ref={container} style={{ width: '100%', height: '100%' }}>
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
		</div>
	);
};
