/* eslint-disable */

import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import { config as dotEnvConfig } from 'dotenv';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

dotEnvConfig();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req }),
});

mongoose.set('useFindAndModify', false);
mongoose
	.connect(`${process.env.MONGODB}`, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to database!');
		return server.listen({ port: 5000 });
	})
	.then((res) => {
		console.log('\x1b[32m', `Server running at ${res.url}`);
	})
	.catch((err) => console.log('\x1b[31m', err));