import gql from 'graphql-tag';

export const getEventsQuery = gql`
	query events {
		getUserEvents {
			start
			end
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
