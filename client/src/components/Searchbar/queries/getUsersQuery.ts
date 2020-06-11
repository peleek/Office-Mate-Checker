import gql from 'graphql-tag';

export const getUsersQuery = gql`
	query getUsers($usernamePart: String!) {
		getUsers(usernamePart: $usernamePart)
	}
`;
