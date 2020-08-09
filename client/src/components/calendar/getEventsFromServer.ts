import gql from 'graphql-tag';

export const getEventsQuery = gql`
	query events($username: String) {
		getUserEvents(username: $username) {
			title
			start
			end
			id
		}
	}
`;

export const addEventsMutation = gql`
	mutation updateEvents($events: [EventInput!]) {
		updateEvents(events: $events) {
			description
		}
	}
`;
