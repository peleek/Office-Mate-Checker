import gql from 'graphql-tag';

export const getEventsQuery = gql`
	query events {
		getUserEvents {
			startDate
			endDate
		}
	}
`;

export const addEventsMutation = gql`
	mutation updateEvents($eventInput: [any!]) {
		updateEvents(eventInput: $eventInput) {
			description
		}
	}
`;
