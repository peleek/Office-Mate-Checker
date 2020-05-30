import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { Navbar } from '../components/Navbar'
import { LoginAndRegister } from '../pages/LoginAndRegister'
import { Redirect } from 'react-router';

export const Home = () => {
    const { user, logout } = useContext(AuthContext)

    const pageContent = user ? <Redirect to='/mycalendar' /> : <LoginAndRegister />

    return pageContent
};