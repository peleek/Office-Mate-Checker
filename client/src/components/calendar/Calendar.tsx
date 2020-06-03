import React, { useRef, useEffect } from 'react';
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
	const [addToServer, { loading: addEventsLoading, data: addEventsData }] = useMutation(addEventsMutation);

	const saveToServer = () => {
		const events = getConvertedData(calendarRef.current.calendar);
		addToServer({
			eventsInput: events,
		});
	};

	const { loading, error, data } = useQuery(getEventsQuery);

	useEffect(() => {
		console.log(data);
		console.log(addEventsData);
	}, [data, addEventsData]);
	return (
		<>
			{loading ? (
				<CircularProgress />
			) : (
				<FullCalendar
					ref={calendarRef}
					events={data.getUserEvents}
					defaultView="timeGridWeek"
					plugins={[timeGridPlugin, interactionPlugin]}
					editable
				/>
			)}
			{addEventsLoading ? <CircularProgress /> : <Button onClick={saveToServer}>Save calendar to server</Button>}
		</>
	);
};
