import gql from 'graphql-tag';

export const ADD_EVENT_MUTATION = gql`
	mutation addEvent($event: EventInput!) {
		addEvent(event: $event) {
			eventId
		}
	}
`;
