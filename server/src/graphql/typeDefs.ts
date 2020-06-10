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
		start: Float!
		end: Float!
		title: String!
	}

	type Event {
		start: Float!
		end: Float!
		title: String!
	}

	type Status {
		description: String!
	}

	type Query {
		getUserEvents(username: String!): [Event]
		getUsers(usernamePart: String!): [String!]
	}

	type Mutation {
		register(registerInput: RegisterInput): User!
		login(username: String!, password: String!): User!
		updateEvents(events: [EventInput]): Status!
	}
`;
