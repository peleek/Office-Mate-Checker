import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import { EventApi, DateSelectArg, EventClickArg, EventContentArg, guid } from '@fullcalendar/react';
import { useQuery } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router';
import { CalendarSidebar } from '../components/calendar/CalendarSidebar';
import { getEventsQuery } from '../components/calendar/getEventsFromServer';
import { CalendarDemo } from '../components/calendar/CalendarDemo';
import { AuthContext } from '../context/authContext';
import { makeStyles } from '@material-ui/core/styles';
import { useDateModalContext } from '../context/dateModalContext';

type ParamProps = {
	name: string;
};

const useStyles = makeStyles((theme) => ({
	calendarContainer: {
		maxHeight: '500px',
		overflow: 'hiden',
	},
}));

export const CalendarPage: React.FC<RouteComponentProps<ParamProps>> = (props): JSX.Element => {
	const styles = useStyles();
	const { handleEventClick, handleDateSelect, setCalendarRef } = useDateModalContext();
	const [weekendsVisible, setWeekendsVisible] = useState(true);
	const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
	const { user } = useContext(AuthContext);

	const { loading, data } = useQuery(getEventsQuery, {
		variables: { username: props.match.params.name?.substring(1) || user.username },
	});

	const renderEventContent = (eventContent: EventContentArg) => {
		return (
			<>
				<b>{eventContent.timeText}</b>
				<i>{eventContent.event.title}</i>
			</>
		);
	};

	return (
		<Grid container className={styles.calendarContainer}>
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
					setCalendarRef={setCalendarRef}
				/>
			</Grid>
		</Grid>
	);
};
