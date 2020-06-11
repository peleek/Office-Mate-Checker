import React, { useRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useParams } from 'react-router';
import '@fullcalendar/core/main.css';
import '@fullcalendar/timegrid/main.css';
import { Button, CircularProgress } from '@material-ui/core';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { getConvertedData } from './getConvertedData';
import { getEventsQuery, addEventsMutation } from './getEventsFromServer';

export const Calendar: React.FC = () => {
	const calendarRef: React.Ref<any> = useRef(null);
	const [initialEvents, setInitialEvents] = useState();
	const { name } = useParams();
	const [addToServer, { loading: addEventsLoading }] = useMutation(addEventsMutation);
	const [getEvents, { loading, data }] = useLazyQuery(getEventsQuery);

	const saveToServer = () => {
		const events = getConvertedData(calendarRef.current.calendar);
		addToServer({
			variables: {
				events,
			},
		});
	};

	useEffect(() => {
		console.log(name);
		getEvents({ variables: { username: name?.substring(1, name.length) } });
	}, [name]);

	useEffect(() => {
		console.log(loading);
		if (!loading) {
			setInitialEvents(data?.getUserEvents);
		}
	}, [loading, data]);

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
