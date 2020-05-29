import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, makeStyles } from '@material-ui/core';
import { Register } from './pages/Register';
import { AuthRoute } from './pages/AuthRoute';
import { Calendar } from './pages/Calendar';
import { Login } from './pages/Login';
import { Home } from './pages/Home'
import { AuthContextProvider } from './context/authContext'


const useStyles = makeStyles((theme) => ({
	appContainer: {
		backgroundColor: '#5d5d5a',
		minWidth: '100%'
	}
}));

export const App = () => {
	const classes = useStyles()
	return (
		<AuthContextProvider>
			<Router>
				<Container className={classes.appContainer}>
					<Route exact path="/" component={Home} />
					<AuthRoute exact path="/login" component={Login} />
					<AuthRoute exact path="/register" component={Register} />
					<Route exact path="/calendar" component={Calendar} />
				</Container>
			</Router>
		</AuthContextProvider>
	);
};
