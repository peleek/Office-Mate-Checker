import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Navbar } from './components/Navbar';
import { Calendar } from './pages/Calendar';

export const App = () => {
	return (
		<Router>
			<Container>
				<Navbar />
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/calendar" component={Calendar} />
			</Container>
		</Router>
	);
};
