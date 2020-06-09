import { EventsResolvers } from './events';
import { UsersResolvers } from './users';

export const resolvers = {
	Query: {
		...EventsResolvers.Query,
		...UsersResolvers.Query,
	},

	Mutation: {
		...UsersResolvers.Mutation,
		...EventsResolvers.Mutation,
	},
};
