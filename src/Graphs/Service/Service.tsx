import React, { FunctionComponent } from 'react';
import * as Graph from '../Graph/Graph';
import { style } from './style';
import * as models from './models';
import { mapToGraphElements } from './mapper';

const layout: Graph.coseBilkentLayout = { name: 'cose-bilkent' };

export type Props = {
	service: models.service;
};

export const Component: FunctionComponent<Props> = ({ service }) => {
	const handleSelect = (item: Graph.itemSelectEvent) => {};

	const elements = mapToGraphElements(service);

	return (
		<Graph.Component
			elements={elements}
			layout={layout}
			zoomingEnabled={true}
			panningEnabled={true}
			stylesheet={style}
			onItemSelected={handleSelect}
		/>
	);
};
