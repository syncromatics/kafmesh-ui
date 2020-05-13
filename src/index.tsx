import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './App';
import ApolloClient from 'apollo-client';
// Setup the network "links"
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import types from './types.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
	introspectionQueryResultData: types
});

const httpLink = new HttpLink({
	uri: '/query/'
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
	uri: 'ws://' + window.location.host + '/query', // use wss for a secure endpoint
	options: {
		reconnect: true
	}
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
	// split based on operation type
	({ query }) => {
		const definition = getMainDefinition(query);
		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
	},
	wsLink,
	httpLink
);

// Instantiate client
const client = new ApolloClient({
	link,
	cache: new InMemoryCache({ fragmentMatcher })
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);
