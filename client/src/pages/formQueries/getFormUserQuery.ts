import gql from 'graphql-tag';

export const REGISTER_USER_MUTATION = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
		$organizationName: String
		$organizationCode: String
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
				organizationName: $organizationName
				organizationCode: $organizationCode
			}
		) {
			id
			email
			username
			createdAt
			token
			organizationName
			organizationCode
		}
	}
`;

export const LOGIN_USER_MUTATION = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			id
			email
			username
			createdAt
			token
		}
	}
`;
