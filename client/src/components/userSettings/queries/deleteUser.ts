import gql from 'graphql-tag';

export const DELETE_USER_MUTATION = gql`
	mutation deleteUser($currentPassword: String!) {
		deleteUser(currentPassword: $currentPassword) {
			description
		}
	}
`;
