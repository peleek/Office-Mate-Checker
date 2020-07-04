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
		organizationCode: String
		organizationName: String
	}

	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
		organizationCode: String
		organizationName: String
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

	type ChangedDataResponse {
		token: String!
	}

	type Query {
		getUserEvents(username: String): [Event]
		getUsers(usernamePart: String!): [String!]
	}

	input UserDataInput {
		username: String!
		email: String!
	}

	type Mutation {
		register(registerInput: RegisterInput): User!
		login(username: String!, password: String!): User!
		updateEvents(events: [EventInput]): Status!
		changeUserData(userData: UserDataInput!): ChangedDataResponse!
		changePassword(currentPassword: String!, newPassword: String!, confirmedNewPassword: String!): Status!
		deleteUser(currentPassword: String!): Status!
	}
`;
