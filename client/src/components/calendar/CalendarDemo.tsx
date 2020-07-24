import React, { useRef } from 'react';
import FullCalendar, { EventApi } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Button, CircularProgress } from '@material-ui/core';
import './calendarStyle.css';
import { ICalendarProps } from './types';

export const CalendarDemo = ({
	addEventsLoading,
	setCurrentEvents,
	handleEventClick,
	renderEventContent,
	weekendsVisible,
	initialEvents,
	handleDateSelect,
	saveToServer,
	loading,
}: ICalendarProps): JSX.Element => {
	const calendarRef: React.Ref<any> = useRef(null);

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
							initialView="dayGridMonth"
							editable={true}
							selectable={true}
							selectMirror={true}
							dayMaxEvents={true}
							weekends={weekendsVisible}
							// initialEvents={initialEvents} // alternatively, use the `events` setting to fetch from a feed
							select={handleDateSelect}
							eventContent={renderEventContent} // custom render function
							eventClick={handleEventClick}
							eventsSet={(events: EventApi[]) => setCurrentEvents(events)} // called after events are initialized/added/changed/removed
							/* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
						/>
					</div>
				</div>
			)}
			{addEventsLoading ? (
				<CircularProgress />
			) : (
				<Button onClick={() => saveToServer(calendarRef)}>Save calendar to server</Button>
			)}
		</>
	);
};
