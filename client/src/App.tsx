import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, makeStyles } from '@material-ui/core';
import { AuthRoute } from './pages/AuthRoute';
import { Home } from './pages/Home';
import { AuthContextProvider } from './context/authContext';
import { Navbar } from './components/Navbar';
import { CalendarPage } from './pages/CalendarPage';
import { UserSettings } from './pages/UserSettings';

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
					<AuthRoute noAccess exact path="/mycalendar" component={CalendarPage} />
					<AuthRoute noAccess exact path="/matecalendar" component={CalendarPage} />
					<AuthRoute noAccess exact path="/settings" component={UserSettings} />
				</Container>
			</Router>
		</AuthContextProvider>
	);
};
