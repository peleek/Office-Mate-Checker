import { EventApi, DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/react';

export type Event = {
	start: number;
	end: number;
	title: string;
};
export interface ICalendarState {
	currentEvents: EventApi[];
}

export interface ICalendarProps {
	saveToServer: (calendarRef: React.RefObject<any>) => void;
	addEventsLoading: boolean;
	handleEventClick: (clickInfo: EventClickArg) => void;
	setCurrentEvents: React.Dispatch<React.SetStateAction<EventApi[]>>;
	renderEventContent: (eventContent: EventContentArg) => JSX.Element;
	handleDateSelect: (selectInfo: DateSelectArg) => void;
	weekendsVisible: boolean;
	initialEvents: any;
	loading: boolean;
}
