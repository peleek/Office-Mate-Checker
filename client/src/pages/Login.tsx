import React, { useState, useContext } from 'react';
import { Grid, makeStyles, Button, CircularProgress } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Alert from '@material-ui/lab/Alert';
import { CustomTextField } from '../components/CustomTextField';
import { AuthContext } from '../context/authContext';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(2),
		},
	},
	alert: {
		marginTop: '20px',
	},
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

export const Login = () => {
	const context = useContext(AuthContext);
	const styles = useStyles();

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
		update(proxy, { data: { login: userData } }) {
			context.login(userData);
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

	const onChange = (e) => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<form noValidate autoComplete="off" onSubmit={onSubmit}>
			<Grid container className={styles.root} direction="column" alignItems="center" justify="center">
				<Grid item>
					<CustomTextField errorsArray={errors.username} onChange={onChange} label="Username" />
				</Grid>
				<Grid item>
					<CustomTextField isPassword errorsArray={errors.password} onChange={onChange} label="Password" />
				</Grid>

				{loading ? (
					<CircularProgress />
				) : (
					<Button type="submit" variant="outlined">
						Login
					</Button>
				)}
				{errors.server.length
					? errors.server.map((el) => (
							<Alert className={styles.alert} severity="error">
								{el}
							</Alert>
					  ))
					: null}
			</Grid>
		</form>
	);
};
