import React, { useRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import '@fullcalendar/core/main.css';
import '@fullcalendar/timegrid/main.css';
import { Button, CircularProgress } from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { getConvertedData } from './getConvertedData';
import { getEventsQuery, addEventsMutation } from './getEventsFromServer';

export const Calendar: React.FC = () => {
	const calendarRef: React.Ref<any> = useRef(null);
	const [initialEvents, setInitialEvents] = useState([
		{ start: Date.now().toString(), end: Date.now().toString(), title: 'Busy' },
	]);

	const [addToServer, { loading: addEventsLoading, data: addEventsData }] = useMutation(addEventsMutation);
	const { loading, error, data } = useQuery(getEventsQuery);

	const saveToServer = () => {
		const events = getConvertedData(calendarRef.current.calendar);
		addToServer({
			variables: {
				events,
			},
		});
	};

	useEffect(() => {
		if (!loading) {
			setInitialEvents(data.getUserEvents);
			console.log(data.getUserEvents);
		}
	}, [loading]);

	useEffect(() => {
		window.calendar = calendarRef;
	}, []);

	return (
		<>
			{loading ? (
				<CircularProgress />
			) : (
				<FullCalendar
					ref={calendarRef}
					events={initialEvents}
					defaultView="timeGridWeek"
					plugins={[timeGridPlugin, interactionPlugin]}
					editable
				/>
			)}
			{addEventsLoading ? <CircularProgress /> : <Button onClick={saveToServer}>Save calendar to server</Button>}
		</>
	);
};
