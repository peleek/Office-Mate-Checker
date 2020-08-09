import * as React from 'react';
import { ApolloClient, ApolloLink } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';

import { App } from './App';

const httpLink = createHttpLink({
	uri: 'http://localhost:5000',
});

const authLink = setContext(() => {
	const token = localStorage.getItem('jwtToken');
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const errorLink = onError(({ graphQLErrors }) => {
	if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const client = new ApolloClient({
	link: ApolloLink.from([errorLink, authLink, httpLink]),
	cache: new InMemoryCache(),
});

export const ApolloWrapper = (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
