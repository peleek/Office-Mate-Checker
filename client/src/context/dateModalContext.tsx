import React, { createContext, useState, useContext, useEffect } from 'react';
import { DateSelectArg, EventClickArg, guid } from '@fullcalendar/react';

const DateModalContext = createContext(null);

export const useDateModalContext = () => useContext(DateModalContext);

export const DateModalContextProvider = (props) => {
	const [open, setOpen] = useState(false);
	const [initialDate, setInitialDate] = useState({});
	const [calendarRef, setCalendarRef] = useState();
	const handleDateSelect = (selectInfo: DateSelectArg) => {
		setInitialDate(selectInfo);
		setOpen(true);
	};

	useEffect(() => {
		console.log(calendarRef);
	});

	const submitDateSelect = ({ startStr, endStr, allDay, view, title }) => {
		const calendarApi = view.calendar;

		if (title) {
			// @ts-ignore: Unreachable code error

			calendarApi.addEvent({
				id: guid(),
				title,
				start: startStr,
				end: endStr,
				allDay,
			});
		}
		setOpen(false);
	};

	const handleEventClick = (clickInfo: EventClickArg) => {
		setInitialDate(clickInfo.event);
		setOpen(true);
	};

	return (
		<DateModalContext.Provider
			value={{
				setCalendarRef,
				handleEventClick,
				handleDateSelect,
				submitDateSelect,
				initialDate,
				open,
				setOpen,
				setInitialDate,
			}}
			{...props}
		/>
	);
};
