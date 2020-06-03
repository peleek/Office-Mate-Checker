import { gql } from 'apollo-server';

export const typeDefs = gql`
	type Post {
		id: ID!
		body: String!
		createdAt: String!
		username: String!
	}

	type User {
		id: ID!
		email: String!
		token: String!
		username: String!
		createdAt: String!
	}

	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}

	input EventInput {
		startDate: String!
		endDate: String!
		description: String!
		token: String
	}

	type Event {
		startDate: String!
		endDate: String!
		title: String!
	}

	type Status {
		description: String!
	}

	type Query {
		getUserEvents: [Event]
	}

	type Mutation {
		register(registerInput: RegisterInput): User!
		login(username: String!, password: String!): User!
		updateEvents(eventInput: [EventInput]): Status!
	}
`;
