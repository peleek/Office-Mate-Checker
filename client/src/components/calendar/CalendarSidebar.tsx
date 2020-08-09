import React, { useState } from 'react';
import { formatDate } from '@fullcalendar/react';
import { EventApi } from '@fullcalendar/core';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export const CalendarSidebar = ({ weekendsVisible, currentEvents, setWeekendsVisible }): JSX.Element => {
	const [term, setTerm] = useState('');
	const [checked, setChecked] = useState(true);

	const filteredEventList = () => {
		const newEventList = currentEvents.filter((event) => {
			return event.title.includes(term);
		});
		return newEventList;
	};

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
		<div className="calendar-sidebar">
			<div className="calendar-sidebar-section">
				<h2>Instructions</h2>
				<ul>
					<li>Select dates and you will be prompted to create a new event</li>
					<li>Drag, drop, and resize events</li>
					<li>Click an event to delete it</li>
				</ul>
			</div>
			<div className="calendar-sidebar-section">
				<label>
					<input
						type="checkbox"
						checked={weekendsVisible}
						onChange={() => setWeekendsVisible(!weekendsVisible)}
					></input>
					toggle weekends
				</label>
			</div>
			<div className="calendar-sidebar-section">
				{/* <FormControlLabel
					control={<Switch checked={checked} onChange={() => setChecked(!checked)} />}
					label={`Show Events ${currentEvents.length}`}
				/>
				<input onChange={(e) => setTerm(e.target.value)} value={term} type="text" />
				<Fade in={checked}>
					<ul>{filteredEventList().map(renderSidebarEvent)}</ul>
				</Fade> */}
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<Typography>{`Show Events (${currentEvents.length})`}</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails style={{ display: 'grid' }}>
						{/* <FormControlLabel
							control={<Switch checked={checked} onChange={() => setChecked(!checked)} />}
							label={}
						/> */}
						<input onChange={(e) => setTerm(e.target.value)} value={term} type="text" />
						{/* <Fade in={checked}> */}
						<ul>{filteredEventList().map(renderSidebarEvent)}</ul>
						{/* </Fade> */}
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		</div>
	);
};
