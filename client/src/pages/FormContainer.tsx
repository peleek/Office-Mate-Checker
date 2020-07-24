import React, { useState, useContext } from 'react';
import { makeStyles, Fade } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../context/authContext';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { REGISTER_USER_MUTATION, LOGIN_USER_MUTATION } from './formQueries/getFormUserQuery';

const useStyles = makeStyles((theme) => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: '100vh',
		marginLeft: theme.spacing(7),
		marginRight: theme.spacing(7),
	},
	margin: {
		marginTop: theme.spacing(4),
	},
	container: {
		display: 'flex',
	},
}));

const emptyErrors = {
	loginErrors: {
		username: [],
		password: [],
		server: [],
	},
	registerErrors: {
		username: [],
		email: [],
		password: [],
		confirmPassword: [],
		server: [],
		organizationName: [],
		organizationCode: [],
	},
};

export const FormContainer = () => {
	const { login } = useContext(AuthContext);
	const classes = useStyles();

	const [checked, setChecked] = useState(true);
	const handleFormChange = () => {
		setChecked(!checked);
	};

	const [formValues, setFormValues] = useState({
		loginFormValues: {
			username: '',
			password: '',
		},
		registerFormValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
			organizationCode: '',
			organizationName: '',
		},
	});

	const [errors, setErrors] = useState(emptyErrors);

	const [loginUser, { loading: loginLoading }] = useMutation(LOGIN_USER_MUTATION, {
		update(proxy, response) {
			login(response.data.login);
		},
		onError(err) {
			const loginFormErrors = err.graphQLErrors[0]?.extensions?.exception.errors as any[];
			if (loginFormErrors) {
				setErrors({
					...errors,
					loginErrors: { ...errors.loginErrors, ...loginFormErrors },
				});
			} else
				setErrors({
					...errors,
					loginErrors: { ...errors.loginErrors, ...loginFormErrors, server: ['Internal server error.'] },
				});
		},
		variables: {
			...formValues.loginFormValues,
		},
	});

	const [addUser, { loading: registerLoading }] = useMutation(REGISTER_USER_MUTATION, {
		update(proxy, response) {
			login(response.data.register);
		},
		onError(err) {
			const registerFormErrors = err.graphQLErrors[0]?.extensions?.exception.errors;
			if (registerFormErrors) {
				setErrors({
					...errors,
					registerErrors: { ...errors.registerErrors, ...registerFormErrors },
				});
			} else
				setErrors({
					...errors,
					registerErrors: {
						...errors.registerErrors,
						...registerFormErrors,
						server: ['Internal server error.'],
					},
				});
		},
		variables: {
			...formValues.registerFormValues,
		},
	});

	const onLoginSubmit = (e) => {
		e.preventDefault();
		setErrors(emptyErrors);
		loginUser();
	};

	const onRegisterSubmit = (e) => {
		e.preventDefault();
		setErrors(emptyErrors);
		addUser();
	};

	const setLoginInputChange = (e) => {
		setFormValues({
			...formValues,
			loginFormValues: { ...formValues.loginFormValues, [e.target.name]: e.target.value },
		});
	};

	const setRegisterInputChange = (e) => {
		setFormValues({
			...formValues,
			registerFormValues: { ...formValues.registerFormValues, [e.target.name]: e.target.value },
		});
	};

	const renderForm = () => {
		return checked ? (
			<Fade in={checked}>
				<LoginForm
					setInputChange={setLoginInputChange}
					loading={loginLoading}
					errors={errors.loginErrors}
					handleFormChange={handleFormChange}
					onLoginSubmit={onLoginSubmit}
				/>
			</Fade>
		) : (
			<Fade in={!checked}>
				<RegisterForm
					handleFormChange={handleFormChange}
					setInputChange={setRegisterInputChange}
					errors={errors.registerErrors}
					loading={registerLoading}
					onRegisterSubmit={onRegisterSubmit}
				/>
			</Fade>
		);
	};

	return renderForm();
};
