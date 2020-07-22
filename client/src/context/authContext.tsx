import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

type User = {
	id: string;
	email: string;
	username: string;
};

type State = {
	user: User;
};

type AuthState = {
	user: User;
	login: (userData?: User) => void;
	logout: () => void;
};

const initialAuthState: AuthState = {
	user: null,
	login: () => null,
	logout: () => null,
};

const reducerInitialState: State = {
	user: null,
};

if (localStorage.getItem('jwtToken')) {
	const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

	if (decodedToken.exp * 1000 < Date.now()) {
		localStorage.removeItem('jwtToken');
	} else {
		reducerInitialState.user = decodedToken;
	}
}

export const AuthContext = createContext(initialAuthState);

export const authReducer = (initState, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...initState,
				user: action.payload,
			};
		case 'LOGOUT':
			return {
				...initState,
				user: null,
			};
		default:
			return initState;
	}
};

export const AuthContextProvider: React.FC = (props) => {
	const [{ user }, dispatch] = useReducer(authReducer, reducerInitialState);

	function login(userData) {
		localStorage.setItem('jwtToken', userData.token);
		const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

		dispatch({
			type: 'LOGIN',
			payload: decodedToken,
		});
	}

	function logout() {
		localStorage.removeItem('jwtToken');
		dispatch({
			type: 'LOGOUT',
		});
	}

	return (
		<AuthContext.Provider
			value={{
				login,
				logout,
				user,
			}}
			{...props}
		/>
	);
};
