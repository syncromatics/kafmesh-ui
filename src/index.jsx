import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import COSEBilkent from 'cytoscape-cose-bilkent';
import Cytoscape from 'cytoscape';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './App';

// Graph formatting/styling initialized
Cytoscape.use(COSEBilkent);

const client = new ApolloClient({
	uri: 'http://localhost/query',
	cache: new InMemoryCache()
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);
