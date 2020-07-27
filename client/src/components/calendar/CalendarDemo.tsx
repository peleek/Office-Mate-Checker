import React, { useRef } from 'react';
import FullCalendar, { EventApi } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CircularProgress } from '@material-ui/core';
import './calendarStyle.css';
import { useMutation } from '@apollo/react-hooks';
import { ICalendarProps } from './types';
import { ADD_EVENT_MUTATION } from './graphql/eventMutations';

export const CalendarDemo = ({
	setCurrentEvents,
	handleEventClick,
	renderEventContent,
	weekendsVisible,
	initialEvents,
	handleDateSelect,
	loading,
}: ICalendarProps): JSX.Element => {
	const calendarRef: React.Ref<any> = useRef(null);
	const [addEvent] = useMutation(ADD_EVENT_MUTATION, {
		update(proxy, response) {
			// event is is here : response.data.addEvent.eventId
			// its needed to handle remove this event from pendingEvents array
		},
		onError(err) {
			// remove it from pendingEvents array and also call revert() function on this event
		},
	});

	return (
		<>
			{loading ? (
				<CircularProgress />
			) : (
				<div className="demo-app">
					<div className="demo-app-main">
						<FullCalendar
							ref={calendarRef}
							plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
							events={initialEvents}
							headerToolbar={{
								left: 'prev,next today',
								center: 'title',
								right: 'dayGridMonth,timeGridWeek,timeGridDay',
							}}
							initialView="timeGridWeek"
							editable
							selectable
							selectMirror
							dayMaxEvents
							weekends={weekendsVisible}
							select={handleDateSelect}
							eventContent={renderEventContent} // custom render function
							eventClick={handleEventClick}
							eventsSet={(events: EventApi[]) => setCurrentEvents(events)} // called after events are initialized/added/changed/removed
							eventAdd={(e) => {
								addEvent({ variables: { event: e.event }, context: { event: e.event } });
							}}
							eventChange={(e) => setTimeout(() => e.revert(), 3000)}
							eventRemove={(e) => setTimeout(() => e.revert(), 3000)}
						/>
					</div>
				</div>
			)}
		</>
	);
};
