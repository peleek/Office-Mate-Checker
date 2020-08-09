import React, { useState } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Box, createStyles, makeStyles, Theme, Grid, Button, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { useDateModalContext } from '../context/dateModalContext';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		input: {
			'& > *': {
				margin: theme.spacing(1),
				width: '30ch',
			},
		},
	})
);

export const ModalDatePicker = () => {
	const styles = useStyles();
	const { initialDate, submitDateSelect } = useDateModalContext();
	console.log(initialDate);
	const { startStr, endStr, selectInfo } = initialDate;
	const [selectedStartDate, setStartSelectedDate] = useState<Date | null>(startStr.substring(0, startStr.length - 6));
	const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(endStr.substring(0, startStr.length - 6));
	const [title, setTile] = useState('');

	const eventObject = {
		startStr: `${selectedStartDate}+03:00`,
		endStr: `${selectedEndDate}+03:00`,
		allDay: selectInfo.allDay,
		selectInfo,
		title,
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Grid container justify="space-around">
				<KeyboardDatePicker
					disableToolbar
					variant="inline"
					format="MM/dd/yyyy"
					margin="normal"
					id="date-picker-inline"
					label="Date picker inline"
					value={selectedStartDate}
					onChange={setStartSelectedDate}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
				/>
				<KeyboardDatePicker
					margin="normal"
					id="date-picker-dialog"
					label="Date picker dialog"
					format="MM/dd/yyyy"
					value={selectedEndDate}
					onChange={setSelectedEndDate}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
				/>
				<KeyboardTimePicker
					margin="normal"
					id="time-picker"
					label="Time picker"
					value={selectedStartDate}
					onChange={setStartSelectedDate}
					KeyboardButtonProps={{
						'aria-label': 'change time',
					}}
				/>
				<KeyboardTimePicker
					margin="normal"
					id="time-picker"
					label="Time picker"
					value={selectedEndDate}
					onChange={setSelectedEndDate}
					KeyboardButtonProps={{
						'aria-label': 'change time',
					}}
				/>
			</Grid>
			<Box alignItems="center" display="flex" p={1} bgcolor="background.paper">
				<TextField
					onChange={(e) => setTile(e.target.value)}
					required
					id="outlined-basic"
					label="The name of the event"
					variant="outlined"
					className={styles.input}
					value={title}
				/>
				<Button onClick={() => submitDateSelect(eventObject)} size="medium" variant="outlined" color="primary">
					Submit
				</Button>
				<Button size="medium" variant="outlined" color="secondary">
					DeleteEvent
				</Button>
			</Box>
		</MuiPickersUtilsProvider>
	);
};
