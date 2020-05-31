import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

type State = {
	user: null;
};

const initialAuthState = {
	user: null,
	login: (userData) => {},
	logout: () => {},
};

const initialState: State = {
	user: null,
};

if (localStorage.getItem('jwtToken')) {
	const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
	if (decodedToken.exp * 1000 < Date.now()) {
		localStorage.removeItem('jwtToekn');
	} else {
		initialState.user = decodedToken;
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
	const [{ user }, dispatch] = useReducer(authReducer, initialState);

	function login(userData) {
		localStorage.setItem('jwtToken', userData.token);
		dispatch({
			type: 'LOGIN',
			payload: userData,
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
