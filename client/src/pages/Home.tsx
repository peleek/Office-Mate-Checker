import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { Navbar } from '../components/Navbar'
import { LoginAndRegister } from '../pages/LoginAndRegister'

export const Home = () => {
    const { user, logout } = useContext(AuthContext)

    const pageContent = user ?
        <Navbar />
        :
        <LoginAndRegister />

    return pageContent
};