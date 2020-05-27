import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Container } from '@material-ui/core';
import { LoginAndRegister } from './pages/LoginAndRegister';
import { LoginForLandingpage } from './pages/LoginForLandingpage';
import { Register } from './pages/Register';
import { Navbar } from './components/Navbar';
// import { Calendar } from './pages/Calendar';
import { HomeSearch } from './pages/HomeSearch';
import { Login } from './pages/Login';

export const App = () => {
	return (
		<Router>
			{/* <Container> */}
			<Navbar />
			{/* <Route exact path="/" component={Home} /> */}
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register} />
			{/* <Route exact path="/calendar" component={Calendar} /> */}
			{/* </Container> */}
			<Route exact path="/login" component={LoginForLandingpage} />
			<Route exact path="/" component={LoginAndRegister} />
		</Router>
	);
};
