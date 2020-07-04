import gql from 'graphql-tag';

export const USER_DATA_MUTATION = gql`
	mutation changeUserData($userData: UserDataInput!) {
		changeUserData(userData: $userData) {
			description
		}
	}
`;
