import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, makeStyles } from '@material-ui/core';
import { Register } from './pages/Register';
import { AuthRoute } from './pages/AuthRoute';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { AuthContextProvider } from './context/authContext';
import { Navbar } from './components/Navbar';
import { CalendarPage } from './pages/CalendarPage';
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
			<Router>
				<Container className={classes.appContainer}>
					<Navbar />
					<Route exact path="/" component={Home} />
					<AuthRoute exact path="/login" component={Login} />
					<AuthRoute exact path="/register" component={Register} />
					<AuthRoute noAccess exact path="/mycalendar" component={CalendarPage} />
					<AuthRoute noAccess exact path="/matecalendar" component={NoCalendarInformation} />
					<AuthRoute noAccess exact path="/matecalendar:name" component={CalendarPage} />
				</Container>
			</Router>
		</AuthContextProvider>
	);
};
