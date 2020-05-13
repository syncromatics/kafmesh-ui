import React, { FunctionComponent } from 'react';
import OperationCard from './OperationCard';
import { ApolloError } from 'apollo-client';
import { operation } from './models';

export type Props = {
	loading: boolean;
	error?: ApolloError;
	operations: Array<operation>;
};

export const Component: FunctionComponent<Props> = ({ loading, operations, error }) => {
	if (loading) {
		return <div style={{ width: '100%', height: '100%' }}>Loading</div>;
	}
	if (error) {
		return (
			<div style={{ width: '100%', height: '100%' }}>
				{error.name} : {error.message}
			</div>
		);
	}
	return (
		<ol>
			{operations.map((op, index) => {
				return (
					<li key={index}>
						<OperationCard operation={op} />
					</li>
				);
			})}
		</ol>
	);
};

export default Component;
