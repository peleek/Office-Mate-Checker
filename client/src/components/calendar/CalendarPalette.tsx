import React from 'react';
import { Draggable } from '@fullcalendar/interaction';

export const CalendarPalette: React.FC = () => {
	React.useEffect(() => {
		const draggableEl = document.getElementById('palette-events') as HTMLElement;
		new Draggable(draggableEl, {
			itemSelector: '.fc-event',
			eventData(eventEl) {
				const title = eventEl.getAttribute('title');
				const id = eventEl.getAttribute('data');
				return {
					title,
					id,
				};
			},
		});
	}, []);

	return (
		<>
			<div id="palette-events">
				<div className="fc-event" title="Busy">
					Draggable busy element
				</div>
				<div className="fc-event" title="Available">
					Draggable available element
				</div>
			</div>
			<div>Add specified event </div>
		</>
	);
};
