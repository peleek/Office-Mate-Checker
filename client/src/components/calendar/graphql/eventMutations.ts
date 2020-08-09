import gql from 'graphql-tag';

export const ADD_EVENT_MUTATION = gql`
	mutation addEvent($event: EventInput!) {
		addEvent(event: $event) {
			description
		}
	}
`;

export const CHANGE_EVENT_MUTATION = gql`
	mutation changeEvent($event: EventInput!) {
		changeEvent(event: $event) {
			description
		}
	}
`;

export const REMOVE_EVENT_MUTATION = gql`
	mutation removeEvent($eventId: String!) {
		removeEvent(eventId: $eventId) {
			description
		}
	}
`;
