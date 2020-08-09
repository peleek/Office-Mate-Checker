import { EventApi, DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/react';

export interface ICalendarState {
	currentEvents: EventApi[];
}

export interface ICalendarProps {
	handleEventClick: (clickInfo: EventClickArg) => void;
	setCurrentEvents: React.Dispatch<React.SetStateAction<EventApi[]>>;
	renderEventContent: (eventContent: EventContentArg) => JSX.Element;
	handleDateSelect: (selectInfo: DateSelectArg) => void;
	weekendsVisible: boolean;
	initialEvents: any;
	loading: boolean;
}
