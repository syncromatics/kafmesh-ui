import React, { FunctionComponent } from 'react';
import * as Graph from '../Graph/Graph';
import { style } from './style';
import * as models from './models';
import { mapToGraphElements } from './mapper';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const query = gql`
	query componentById($id: ID!) {
		componentById(id: $id) {
			id
			name
			sources {
				id
				topic {
					id
					name
				}
			}
			processors {
				id
				name
				inputs {
					id
					topic {
						id
						name
					}
				}
				joins {
					id
					topic {
						id
						name
					}
				}
				outputs {
					id
					topic {
						id
						name
					}
				}
				lookups {
					id
					topic {
						id
						name
					}
				}
				persistence {
					id
					name
				}
			}
			views {
				id
				topic {
					id
					name
				}
			}
			sinks {
				id
				topic {
					id
					name
				}
			}
			viewSinks {
				id
				topic {
					id
					name
				}
			}
			viewSources {
				id
				topic {
					id
					name
				}
			}
		}
	}
`;

interface data {
	componentById: models.component;
}

interface variables {
	id: number;
}

const layout: Graph.coseBilkentLayout = { name: 'cose-bilkent', animate: false };

export type itemSelectedEvent = {
	item: processorItem;
};

type processorItem = {
	type: 'processorItem';
	id: number;
};

export type Props = {
	component: number;
	onItemSelected(event: itemSelectedEvent): void;
};

export const Component: FunctionComponent<Props> = ({ component, onItemSelected }) => {
	const { loading, data, error } = useQuery<data, variables>(query, {
		variables: {
			id: component
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
	if (data.componentById == null) {
		return <div style={{ width: '100%', height: '100%' }}>Component {component} not found.</div>;
	}

	const handleSelect = (event: Graph.itemSelectEvent) => {
		switch (event.item.type) {
			case 'node':
				if (event.item.id.includes('processor_')) {
					onItemSelected({
						item: {
							type: 'processorItem',
							id: Number(event.item.id.replace('processor_', ''))
						}
					});
					return;
				}
		}
	};

	const elements = mapToGraphElements(data.componentById);

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
