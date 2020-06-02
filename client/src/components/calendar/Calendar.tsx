import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import '@fullcalendar/core/main.css';
import '@fullcalendar/timegrid/main.css';

export const Calendar: React.FC = () => {
	const [events, setEvents] = useState([
		{ title: 'event 1', start: Date.now(), end: Date.now() },
		{ title: 'event 2', start: Date.now(), end: Date.now() },
	]);

	return (
		<FullCalendar
			events={events}
			defaultView="timeGridWeek"
			plugins={[timeGridPlugin, interactionPlugin]}
			editable
		/>
	);
};
