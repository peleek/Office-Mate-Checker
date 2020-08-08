import React, { createContext, useReducer } from 'react';

export const CalendarContext = createContext(null);

const intialCalendarState = { events: [] };

const calendarReducer = (initialState, action) => {
	switch (action.type) {
		case 'ADD_EVENT': {
			return {
				...initialState,
				events: [...initialState.events, action.payload],
			};
		}
		case 'REMOVE_EVENT': {
			return {
				...initialState,
				events: initialState.events.filter((event) => event.id !== action.payload),
			};
		}
		default:
			return initialState;
	}
};

export const CalendarContextProvider = (props) => {
	const [{ events }, dispatch] = useReducer(calendarReducer, intialCalendarState);

	const addEvent = (event) => {
		dispatch({ type: 'ADD_EVENT', payload: event });
	};
	const RemoveEvent = (id) => {
		dispatch({ type: 'REMOVE_EVENT', payload: id });
	};

	return <CalendarContext.Provider value={{ addEvent, RemoveEvent }} {...props} />;
};
