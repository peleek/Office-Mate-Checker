import React, { createContext, useReducer } from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
    user: null,
    login: (userData) => { },
    logout: () => { }
}

if (localStorage.getItem('jwtToken')) {
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToekn')
    } else {
        initialState.user = decodedToken
    }
}

export const AuthContext = createContext(initialState)

export const authReducer = (initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...initialState,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...initialState,
                user: null
            }
        default:
            return initialState
    }
}

export const AuthContextProvider = (props) => {
    const [{ user }, dispatch] = useReducer(authReducer, initialState)

    function login(userData) {

        localStorage.setItem('jwtToken', userData.token)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    function logout() {
        localStorage.removeItem('jwtToken')
        dispatch({
            type: 'LOGOUT'
        })
    }

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            user
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}
