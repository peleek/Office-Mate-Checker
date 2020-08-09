import React, { createContext, useState, useContext } from 'react';
import { EventApi, DateSelectArg, EventClickArg, EventContentArg, guid } from '@fullcalendar/react';

const DateModalContext = createContext(null);

export const useDateModalContext = () => useContext(DateModalContext);

export const DateModalContextProvider = (props) => {
	const [open, setOpen] = useState(false);
	const [initialDate, setInitialDate] = useState({});

	const handleDateSelect = (selectInfo: DateSelectArg) => {
		setInitialDate(selectInfo);
		console.log(selectInfo);
		setOpen(true);
	};

	const submitDateSelect = ({ startStr, endStr, allDay, selectInfo, title }) => {
		// const title = prompt('Please enter a new title for your event');
		const calendarApi = selectInfo.view.calendar;

		calendarApi.unselect(); // clear date selection

		if (selectInfo.title) {
			calendarApi.addEvent({
				id: guid(),
				title,
				start: startStr,
				end: endStr,
				allDay: allDay,
			});
		}
	};

	const handleEventClick = (clickInfo: EventClickArg) => {
		// eslint-disable-next-line no-alert
		// eslint-disable-next-line no-restricted-globals
		if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
			clickInfo.event.remove();
		}
	};

	return (
		<DateModalContext.Provider
			value={{ handleEventClick, handleDateSelect, submitDateSelect, initialDate, open, setOpen, setInitialDate }}
			{...props}
		/>
	);
};
