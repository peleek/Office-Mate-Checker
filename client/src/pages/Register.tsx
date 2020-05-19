import React, { useState } from 'react';
import { TextField, makeStyles, Grid, Button, CircularProgress } from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Alert from '@material-ui/lab/Alert';

const REGISTER_USER_MUTATION = gql`
	mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

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

const emptyErrors = {
	username: [],
	email: [],
	password: [],
	confirmPassword: [],
	server: [],
};

export const Register = () => {
	const [formValues, setFormValues] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [errors, setErrors] = useState<{ [key: string]: Array<string> }>({
		username: [],
		email: [],
		password: [],
		confirmPassword: [],
		server: [],
	});

	const onChange = (e) => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
	};

	const [addUser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
		// update(proxy, result) {},
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
		addUser();
	};

	const getErrorMessage = (errorArray: Array<string>) => {
		return errorArray.length ? errorArray?.reduce((prev, curr) => `${prev} ${curr}`) : '';
	};

	const styles = useStyles();

	return (
		<form noValidate autoComplete="off" onSubmit={onSubmit}>
			<Grid container className={styles.root} direction="column" alignItems="center" justify="center">
				<Grid item>
					<TextField
						error={!!errors.username.length}
						helperText={getErrorMessage(errors.username)}
						variant="outlined"
						name="username"
						onChange={onChange}
						required
						id="standard-required"
						label="Username"
					/>
				</Grid>
				<Grid item>
					<TextField
						error={!!errors.password.length}
						helperText={getErrorMessage(errors.password)}
						variant="outlined"
						type="password"
						name="password"
						onChange={onChange}
						required
						id="standard-required"
						label="Password"
					/>
				</Grid>
				<Grid item>
					<TextField
						error={!!errors.confirmPassword.length}
						helperText={getErrorMessage(errors.confirmPassword)}
						variant="outlined"
						type="password"
						name="confirmPassword"
						onChange={onChange}
						required
						id="standard-required"
						label="Confirm password"
					/>
				</Grid>
				<Grid item>
					<TextField
						error={!!errors.email.length}
						helperText={getErrorMessage(errors.email)}
						variant="outlined"
						name="email"
						onChange={onChange}
						required
						id="standard-required"
						label="Email"
					/>
				</Grid>
				{loading ? (
					<CircularProgress />
				) : (
					<Button type="submit" variant="outlined">
						Register
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
