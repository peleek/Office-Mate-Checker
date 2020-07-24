import React from 'react';
import { formatDate } from '@fullcalendar/react';
import { EventApi } from '@fullcalendar/core';

export const CalendarSidebar = ({ weekendsVisible, currentEvents, setWeekendsVisible }): JSX.Element => {
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
		<div className="demo-app-sidebar">
			<div className="demo-app-sidebar-section">
				<h2>Instructions</h2>
				<ul>
					<li>Select dates and you will be prompted to create a new event</li>
					<li>Drag, drop, and resize events</li>
					<li>Click an event to delete it</li>
				</ul>
			</div>
			<div className="demo-app-sidebar-section">
				<label>
					<input
						type="checkbox"
						checked={weekendsVisible}
						onChange={() => setWeekendsVisible(!weekendsVisible)}
					></input>
					toggle weekends
				</label>
			</div>
			<div className="demo-app-sidebar-section">
				<h2>All Events ({currentEvents.length})</h2>
				<ul>{currentEvents.map(renderSidebarEvent)}</ul>
			</div>
		</div>
	);
};
