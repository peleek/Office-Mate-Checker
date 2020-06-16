import { Calendar } from '@fullcalendar/core';
import { Event } from './types';

export const getConvertedData = (calendar: Calendar): Array<Event> => {
	const events = Object.values(calendar.state.eventStore.instances).map((el) => {
		const { title } = calendar.state.eventStore.defs[el.defId];
		const { start, end } = el.range;
		return {
			start: start.getTime() + start.getTimezoneOffset() * 1000 * 60,
			end: end.getTime() + start.getTimezoneOffset() * 1000 * 60,
			title,
		};
	});

	return events;
};
