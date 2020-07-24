import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core';
import { EventApi, DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/react';
import { CalendarSidebar } from '../components/calendar/CalendarSidebar';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { getConvertedData } from '../components/calendar/getConvertedData';
import { getEventsQuery, addEventsMutation } from '../components/calendar/getEventsFromServer';
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

	const [addToServer, { loading: addEventsLoading }] = useMutation(addEventsMutation);

	const saveToServer = (calendarRef: React.RefObject<any>) => {
		const events = getConvertedData(calendarRef.current._calendarApi.currentDataManager);
		addToServer({
			variables: {
				events,
			},
		});
	};

	const handleDateSelect = (selectInfo: DateSelectArg) => {
		let title = prompt('Please enter a new title for your event');
		let calendarApi = selectInfo.view.calendar;

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
					saveToServer={saveToServer}
					addEventsLoading={addEventsLoading}
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
