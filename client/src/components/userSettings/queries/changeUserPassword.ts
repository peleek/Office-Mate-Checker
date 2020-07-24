import gql from 'graphql-tag';

export const USER_PASSWORD_MUTATION = gql`
	mutation changePassword($currentPassword: String!, $newPassword: String!, $confirmedNewPassword: String!) {
		changePassword(
			currentPassword: $currentPassword
			newPassword: $newPassword
			confirmedNewPassword: $confirmedNewPassword
		) {
			description
		}
	}
`;
