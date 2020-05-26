import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Container } from '@material-ui/core';
import { LoginAndRegister } from './pages/LoginAndRegister';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { HomeSearch } from './pages/HomeSearch';
// import { Navbar } from './components/Navbar';

export const App = () => {
	return (
		<Router>
			{/* <Container> */}
			{/* <Navbar /> */}
			<Route exact path="/navbar" component={HomeSearch} />
			{/* Route added only for testing reasons */}
			<Route exact path="/" component={LoginAndRegister} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register} />
			{/* </Container> */}
		</Router>
	);
};
