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
		title: String!
		start: String!
		end: String!
		id: String!
	}

	type Event {
		start: Float!
		end: Float!
		title: String!
		id: String!
	}

	type Status {
		description: String!
	}

	type ChangedDataResponse {
		token: String!
	}

	type Query {
		getUserEvents(username: String): [Event]
		getUsers(usernamePart: String!, userId: String!): [String!]
	}

	input UserDataInput {
		username: String!
		email: String!
	}

	type EventResponse {
		eventId: String!
	}

	type Mutation {
		register(registerInput: RegisterInput): User!
		login(username: String!, password: String!): User!
		updateEvents(events: [EventInput]): Status!
		addEvent(event: EventInput!): Status!
		removeEvent(eventId: String!): Status!
		changeEvent(event: EventInput!): Status!
		changeUserData(userData: UserDataInput!): ChangedDataResponse!
		changePassword(currentPassword: String!, newPassword: String!, confirmedNewPassword: String!): Status!
		deleteUser(currentPassword: String!): Status!
	}
`;
