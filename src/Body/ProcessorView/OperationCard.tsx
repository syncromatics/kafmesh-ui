import React, { FunctionComponent } from 'react';
import { operation, action } from './models';

type Props = {
	operation: operation;
};

const actionRender = (action: action) => {
	switch (action.type) {
		case 'Join':
			return (
				<div>
					{action.type} {action.topic}: {action.value}
				</div>
			);
		case 'Lookup':
			return (
				<div>
					{action.type} {action.topic}({action.key}): {action.value}
				</div>
			);
		case 'SetState':
			return (
				<div>
					{action.type} {action.topic}: {action.value}
				</div>
			);
		case 'GetState':
			return (
				<div>
					{action.type} {action.topic}: {action.value}
				</div>
			);
		case 'Output':
			return (
				<div>
					{action.type} {action.topic}({action.key}): {action.value}
				</div>
			);
	}
};

export const Component: FunctionComponent<Props> = ({ operation }) => {
	return (
		<div style={operationStyle}>
			input: "{operation.input.topic}": {operation.input.value}
			<ol>
				{operation.actions.map((action, index) => {
					return (
						<li key={index} style={{ margin: '4px' }}>
							{actionRender(action)}
						</li>
					);
				})}
			</ol>
		</div>
	);
};

export default Component;

const operationStyle: React.CSSProperties = {
	borderWidth: '2px',
	borderStyle: 'solid',
	borderColor: 'black',
	padding: '10px',
	margin: '5px',
	backgroundColor: 'white'
};
