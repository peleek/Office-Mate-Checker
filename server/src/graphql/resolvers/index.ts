import { EventsResolvers } from './events';
import { UsersResolvers } from './users';

export const resolvers = {
	Query: {
		...EventsResolvers.Query,
	},

	Mutation: {
		...UsersResolvers.Mutation,
		...EventsResolvers.Mutation,
	},
};
