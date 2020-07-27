import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { EventApi, DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/react';
import { useQuery } from '@apollo/react-hooks';
import { CalendarSidebar } from '../components/calendar/CalendarSidebar';
import { getEventsQuery } from '../components/calendar/getEventsFromServer';
import { CalendarDemo } from '../components/calendar/CalendarDemo';

export const CalendarPage: React.FC = (): JSX.Element => {
	const [initialEvents, setInitialEvents] = useState();
	const [weekendsVisible, setWeekendsVisible] = useState(true);
	const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);

	const { loading, data } = useQuery(getEventsQuery);

	useEffect(() => {
		if (!loading) {
			setInitialEvents(data.getUserEvents);
		}
	}, [loading]);

	const handleDateSelect = (selectInfo: DateSelectArg) => {
		const title = prompt('Please enter a new title for your event');
		const calendarApi = selectInfo.view.calendar;

		calendarApi.unselect(); // clear date selection

		if (title) {
			calendarApi.addEvent({
				// id: createEventId(),
				title,
				start: selectInfo.startStr,
				end: selectInfo.endStr,
				allDay: selectInfo.allDay,
			});
		}
	};

	const handleEventClick = (clickInfo: EventClickArg) => {
		if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
			clickInfo.event.remove();
		}
	};

	const renderEventContent = (eventContent: EventContentArg) => {
		return (
			<>
				<b>{eventContent.timeText}</b>
				<i>{eventContent.event.title}</i>
			</>
		);
	};

	return (
		<Grid container>
			<Grid item xs={2}>
				<CalendarSidebar
					setWeekendsVisible={setWeekendsVisible}
					weekendsVisible={weekendsVisible}
					currentEvents={currentEvents}
				/>
			</Grid>
			<Grid item xs={10}>
				{/* <Calendar /> */}
				<CalendarDemo
					handleEventClick={handleEventClick}
					setCurrentEvents={setCurrentEvents}
					renderEventContent={renderEventContent}
					handleDateSelect={handleDateSelect}
					weekendsVisible={weekendsVisible}
					initialEvents={initialEvents}
					loading={loading}
				/>
			</Grid>
		</Grid>
	);
};
