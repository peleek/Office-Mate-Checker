import React, { useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
import { makeStyles, Fade, Paper } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AuthContext } from '../context/authContext';
import { LoginForLandingpage } from './LoginForLandingpage'
import { Register } from './Register'

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
	}
}));

const LOGIN_USER_MUTATION = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

const emptyErrors = {
	username: [],
	password: [],
	server: [],
};

export const ContainerForLandingpage = () => {
	const { login } = useContext(AuthContext);
	const classes = useStyles();

	const [checked, setChecked] = useState(true);
	const handleFormChange = () => {
		setChecked(!checked);
	};

	const [formValues, setFormValues] = useState({
		username: '',
		password: '',
	});

	const [errors, setErrors] = useState<{ [key: string]: Array<string> }>({
		username: [],
		password: [],
		server: [],
	});

	const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
		update(proxy, response) {
			// console.log(response.data.login);
			login(response.data.login);
		},
		onError(err) {
			const registerFormErrors = err.graphQLErrors[0]?.extensions?.exception.errors;
			if (registerFormErrors) {
				setErrors({
					...errors,
					...registerFormErrors,
				});
			} else
				setErrors({
					...errors,
					server: ['Internal server error.'],
				});
		},
		variables: {
			...formValues,
		},
	});

	const onSubmit = (e) => {
		e.preventDefault();
		setErrors(emptyErrors);
		loginUser();
	};

	const setInputChange = (e) => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
	};

	const renderForm = () => {
		return checked ? (
			<LoginForLandingpage setInputChange={setInputChange} loading={loading} errors={errors} handleFormChange={handleFormChange} />
		) : (
				<Register handleFormChange={handleFormChange} />
			)
	}


	return (
		<form noValidate autoComplete="off" className={classes.paper} onSubmit={onSubmit}>
			<Fade in={checked}>
				<span>
					{renderForm()}
				</span>
			</Fade>
		</form>
	);
};
