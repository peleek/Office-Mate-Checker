import gql from 'graphql-tag';

export const getEventsQuery = gql`
	query events {
		getUserEvents {
			startDate
			endDate
			title
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
