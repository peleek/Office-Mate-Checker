import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Grid, makeStyles, Button, CircularProgress } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Alert from '@material-ui/lab/Alert';
import { CustomTextField } from '../components/CustomTextField';

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
	roundButton: {
		borderRadius: '20px',
		maxWidth: '300px',
		fontWeight: 700,
	},
	alert: {
		marginTop: '20px',
	},
	label: {
		marginBottom: theme.spacing(4),
	},
	input: {
		minWidth: '300px',
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

export const LoginForLandingpage = () => {
	const styles = useStyles();
	const classes = useStyles();

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
		update(proxy, result) {
			console.log(result);
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
		<form className={classes.paper}>
			<Typography className={classes.label} component="h1" variant="h5">
				Sign in
			</Typography>
			<CustomTextField
				// className={classes.input}
				label="Username"
				onChange={onChange}
				errorsArray={errors.username}
			/>
			<CustomTextField
				// className={classes.input}
				label="Password"
				errorsArray={errors.password}
				onChange={onChange}
			/>
			{loading ? (<CircularProgress />) : (
				<Button type="submit" fullWidth variant="contained" color="primary" className={classes.roundButton}>
					Log in
				</Button>)
			}
			{errors.server.length
				? errors.server.map((el) => (
					<Alert className={classes.alert} severity="error">
						{el}
					</Alert>
				))
				: null}
			<Grid item className={classes.margin}>
				Don&apos;t have an account?
				<Link to="/register">Sign Up</Link>
			</Grid>
		</form>
	);
};
