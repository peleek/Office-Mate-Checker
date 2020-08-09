import React, { useRef } from 'react';
import FullCalendar, { EventApi } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CircularProgress } from '@material-ui/core';
import './calendarStyle.css';
import { useMutation } from '@apollo/react-hooks';
import { ICalendarProps } from './types';
import { EventModal } from './EventModal';
import { ADD_EVENT_MUTATION, REMOVE_EVENT_MUTATION, CHANGE_EVENT_MUTATION } from './graphql/eventMutations';

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
	const [addEvent] = useMutation(ADD_EVENT_MUTATION);
	const [removeEvent] = useMutation(REMOVE_EVENT_MUTATION);
	const [changeEvent] = useMutation(CHANGE_EVENT_MUTATION);

	return (
		<>
			{loading ? (
				<CircularProgress />
			) : (
				<div className="calendar">
					<div className="calendar-main">
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
								addEvent({ variables: { event: e.event } });
							}}
							eventRemove={(e) => {
								removeEvent({ variables: { eventId: e.event.id } });
							}}
							eventChange={(e) => {
								changeEvent({
									variables: {
										event: {
											id: e.event.id,
											title: e.event.title,
											start: e.event.start,
											end: e.event.end,
										},
									},
								});
							}}
						/>
					</div>
					<EventModal />
				</div>
			)}
		</>
	);
};
