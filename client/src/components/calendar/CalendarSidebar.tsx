import React, { useState } from 'react';
import { formatDate } from '@fullcalendar/react';
import { EventApi } from '@fullcalendar/core';

export const CalendarSidebar = ({ weekendsVisible, currentEvents, setWeekendsVisible }): JSX.Element => {
	const [term, setTerm] = useState('');

	const renderSidebarEvent = (event: EventApi) => {
		return (
			<li key={event.id}>
				<b>
					{formatDate(event.start!, {
						year: 'numeric',
						month: 'short',
						day: 'numeric',
					})}
				</b>
				<i>{event.title}</i>
			</li>
		);
	};

	return (
		<div className="calendar-sidebar">
			<div className="calendar-sidebar-section">
				<h2>Instructions</h2>
				<ul>
					<li>Select dates and you will be prompted to create a new event</li>
					<li>Drag, drop, and resize events</li>
					<li>Click an event to delete it</li>
				</ul>
			</div>
			<div className="calendar-sidebar-section">
				<label>
					<input
						type="checkbox"
						checked={weekendsVisible}
						onChange={() => setWeekendsVisible(!weekendsVisible)}
					></input>
					toggle weekends
				</label>
			</div>
			<div className="calendar-sidebar-section">
				<h2>All Events ({currentEvents.length})</h2>
				<input onChange={(e) => setTerm(e.target.value)} value={term} type="text" />
				<ul>{currentEvents.map(renderSidebarEvent)}</ul>
			</div>
		</div>
	);
};
