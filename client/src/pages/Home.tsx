import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { AuthContext } from '../context/authContext';
import { LoginAndRegister } from './ContainerForLandingPage';

export const Home = () => {
	const { user } = useContext(AuthContext);

	const pageContent = user ? <Redirect to="/mycalendar" /> : <LoginAndRegister />;

	return pageContent;
};
