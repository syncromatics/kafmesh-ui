import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';
import OperationsList from './OperationsList';
import { operation } from './models';

const WatchProcessor = gql`
	subscription watchProcessor($options: WatchProcessorInput!) {
		watchProcessor(options: $options) {
			input {
				topic
				message
				value
			}
			actions {
				type: __typename
				... on Join {
					topic
					message
					value
				}
				... on Lookup {
					topic
					message
					key
					value
				}
				... on GetState {
					topic
					message
					value
				}
				... on SetState {
					topic
					message
					value
				}
				... on Output {
					topic
					message
					key
					value
				}
			}
		}
	}
`;

const BodyContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
`;

const Button = styled.button`
	background-color: white;
	margin-bottom: 10px;
	margin-left: 7px;
	font-size: 17px;
	font-family: arial;
	padding: 4px;
	border-radius: 4px;
	box-shadow: 0.1px 0.1px 0.1px 0.1px rgba(0, 0, 0, 0.25);
`;

type watchProcessorOptions = {
	processorId: number;
	key: string;
};

type watchProcessorVariables = {
	options: watchProcessorOptions;
};

type watchProcessorResponse = {
	watchProcessor: operation;
};

export type Props = {
	processor: number;
	topicKey?: string;
};

// Flex # corresponds to vertical section divider location
export const Component: FunctionComponent<Props> = ({ processor, topicKey }) => {
	const history = useHistory();
	const inputRef = useRef<HTMLInputElement>();

	useEffect(
		() => {
			if (inputRef == null) return;
			if (topicKey == null) return;
			inputRef.current.value = topicKey;
		},
		[ topicKey, inputRef ]
	);

	const KeyInput = () => (
		<div style={{ flex: 1, flexDirection: 'row' }}>
			<label>
				Key:
				<input ref={inputRef} type="text" />{' '}
			</label>
			<Button
				onClick={() => {
					history.push('/processors/' + processor + '/' + inputRef.current.value);
				}}
			>
				Watch
			</Button>
		</div>
	);

	if (topicKey == null) {
		return (
			<BodyContainer>
				<KeyInput />
			</BodyContainer>
		);
	}

	const [ getOperations, setOperations ] = useState<Array<operation>>([]);
	const { loading, error } = useSubscription<watchProcessorResponse, watchProcessorVariables>(WatchProcessor, {
		variables: {
			options: {
				processorId: processor,
				key: topicKey
			}
		},
		shouldResubscribe: true,
		onSubscriptionData: (event) => {
			if (event.subscriptionData.data == null) return;

			setOperations(getOperations.concat(event.subscriptionData.data.watchProcessor));
		}
	});
	return (
		<BodyContainer>
			<KeyInput />
			<div style={{ flex: 2 }}>
				<OperationsList loading={loading} operations={getOperations} error={error} />
			</div>
		</BodyContainer>
	);
};

export default Component;
