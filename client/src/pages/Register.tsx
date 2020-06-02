import React, { useState, useContext } from 'react';
import { makeStyles, Grid, Button, CircularProgress, Typography } from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Alert from '@material-ui/lab/Alert';
import { CustomTextField } from '../components/CustomTextField';
import { AuthContext } from '../context/authContext';

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
	margin: {
		marginTop: theme.spacing(4),
	},
	alert: {
		marginTop: '20px',
	},
	buttonSpan: {
		textDecoration: 'underline',
		cursor: 'pointer',
		color: '#069',
		background: 'none',
		border: 'none',
	},
	label: {
		marginBottom: theme.spacing(4),
	},
	roundButton: {
		borderRadius: '20px',
		width: '300px',
		fontWeight: 700,
	},
	input: {
		minWidth: '300px',
		margin: theme.spacing(2),
	},
}));

const emptyErrors = { username: [], email: [], password: [], confirmPassword: [], server: [] };

export const Register = ({ handleFormChange }) => {
	const { login } = useContext(AuthContext);

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
		update(proxy, response) {
			login(response.data.register);
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
		addUser();
	};

	const styles = useStyles();

	return (
		<form noValidate autoComplete="off" onSubmit={onSubmit}>
			<Grid container className={styles.root} direction="column" alignItems="center" justify="center">
				<Typography className={styles.label} component="h1" variant="h5">
					Sign up
				</Typography>
				<Grid item>
					<CustomTextField
						styles={styles.input}
						errorsArray={errors.username}
						onChange={onChange}
						label="Username"
					/>
				</Grid>
				<Grid item>
					<CustomTextField
						styles={styles.input}
						isPassword
						errorsArray={errors.password}
						onChange={onChange}
						label="Password"
					/>
				</Grid>

				<Grid item>
					<CustomTextField
						styles={styles.input}
						isPassword
						errorsArray={errors.confirmPassword}
						onChange={onChange}
						label="Confirm Password"
					/>
				</Grid>
				<Grid item>
					<CustomTextField
						styles={styles.input}
						errorsArray={errors.email}
						onChange={onChange}
						label="Email"
					/>
				</Grid>
				{loading ? (
					<CircularProgress />
				) : (
					<Button className={styles.roundButton} type="submit" color="primary" variant="outlined">
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
				<Grid item className={styles.margin}>
					You have an account?
					{/* <Link to="/register"> Sign Up</Link> */}
					<button type="button" className={styles.buttonSpan} onClick={handleFormChange}>
						{' '}
						Sign In
					</button>
				</Grid>
			</Grid>
		</form>
	);
};
