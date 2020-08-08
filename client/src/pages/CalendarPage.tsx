import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import { EventApi, DateSelectArg, EventClickArg, EventContentArg, guid } from '@fullcalendar/react';
import { useQuery } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router';
import { CalendarSidebar } from '../components/calendar/CalendarSidebar';
import { getEventsQuery } from '../components/calendar/getEventsFromServer';
import { CalendarDemo } from '../components/calendar/CalendarDemo';
import { AuthContext } from '../context/authContext';

type ParamProps = {
	name: string;
};

export const CalendarPage: React.FC<RouteComponentProps<ParamProps>> = (props): JSX.Element => {
	const [weekendsVisible, setWeekendsVisible] = useState(true);
	const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
	const { user } = useContext(AuthContext);

	const { loading, data } = useQuery(getEventsQuery, {
		variables: { username: props.match.params.name?.substring(1) || user.username },
	});

	const handleDateSelect = (selectInfo: DateSelectArg) => {
		const title = prompt('Please enter a new title for your event');
		const calendarApi = selectInfo.view.calendar;

		calendarApi.unselect(); // clear date selection

		if (title) {
			calendarApi.addEvent({
				id: guid(),
				title,
				start: selectInfo.startStr,
				end: selectInfo.endStr,
				allDay: selectInfo.allDay,
			});
		}
	};

	const handleEventClick = (clickInfo: EventClickArg) => {
		// eslint-disable-next-line no-alert
		// eslint-disable-next-line no-restricted-globals
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
				<CalendarDemo
					handleEventClick={handleEventClick}
					setCurrentEvents={setCurrentEvents}
					renderEventContent={renderEventContent}
					handleDateSelect={handleDateSelect}
					weekendsVisible={weekendsVisible}
					initialEvents={data?.getUserEvents || []}
					loading={loading}
				/>
			</Grid>
		</Grid>
	);
};
