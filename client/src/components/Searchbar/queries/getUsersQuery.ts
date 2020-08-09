import gql from 'graphql-tag';

export const getUsersQuery = gql`
	query getUsers($usernamePart: String!, $userId: String!) {
		getUsers(usernamePart: $usernamePart, userId: $userId)
	}
`;
