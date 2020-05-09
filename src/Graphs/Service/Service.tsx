import React, { FunctionComponent } from 'react';
import * as Graph from '../Graph/Graph';
import { style } from './style';
import * as models from './models';
import { mapToGraphElements } from './mapper';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const query = gql`
	query serviceById($id: ID!) {
		serviceById(id: $id) {
			components {
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
	}
`;

interface data {
	serviceById: models.service;
}

interface variables {
	id: number;
}

const layout: Graph.coseBilkentLayout = { name: 'cose-bilkent', animate: false };

export type Props = {
	service: number;
};

export const Component: FunctionComponent<Props> = ({ service }) => {
	const { loading, data, error } = useQuery<data, variables>(query, {
		variables: {
			id: service
		}
	});

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
	if (data.serviceById == null) {
		return <div>service {service} not found.</div>;
	}

	const handleSelect = (item: Graph.itemSelectEvent) => {};

	const elements = mapToGraphElements(data.serviceById);

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
