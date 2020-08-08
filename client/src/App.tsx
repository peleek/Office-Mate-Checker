import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, makeStyles } from '@material-ui/core';
import { AuthRoute } from './pages/AuthRoute';
import { Home } from './pages/Home';
import { AuthContextProvider } from './context/authContext';
import { Navbar } from './components/Navbar';
import { CalendarPage } from './pages/CalendarPage';
import { UserSettings } from './pages/UserSettings';
import { CalendarContextProvider } from './context/calendarContext';
import { NoCalendarInformation } from './components/NoCalendarInformation';

const useStyles = makeStyles(() => ({
	appContainer: {
		minWidth: '100%',
	},
}));

export const App = () => {
	const classes = useStyles();
	return (
		<AuthContextProvider>
			<CalendarContextProvider>
				<Router>
					<Container className={classes.appContainer}>
						<Navbar />
						<Route exact path="/" component={Home} />
						<AuthRoute noAccess exact path="/mycalendar" component={CalendarPage} />
	    				<AuthRoute noAccess exact path="/matecalendar" component={NoCalendarInformation} />
                        <AuthRoute noAccess exact path="/settings" component={UserSettings} />
                        <AuthRoute noAccess exact path="/matecalendar:name" component={CalendarPage} />
					</Container>
				</Router>
			</CalendarContextProvider>
		</AuthContextProvider>
	);
};
