import React from 'react';
import { Grid } from '@material-ui/core';
import { Calendar } from '../components/calendar/Calendar';
import { CalendarPalette } from '../components/calendar/CalendarPalette';

export const CalendarPage: React.FC = () => {
	return (
		<Grid container>
			<Grid item xs={2}>
				<CalendarPalette />
			</Grid>
			<Grid item xs={10}>
				<Calendar />
			</Grid>
		</Grid>
	);
};
