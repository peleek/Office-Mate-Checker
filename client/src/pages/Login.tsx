import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

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
}));

export const Login = () => {
	const classes = useStyles();

	return (
		<form className={classes.paper}>
			<Typography component="h1" variant="h5">
				Sign in
			</Typography>
			<TextField
				error
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="login"
				label="Login"
				name="login"
				autoComplete="login"
				autoFocus
				helperText="Fill this field."
			/>
			<TextField
				error
				variant="outlined"
				margin="normal"
				required
				fullWidth
				name="password"
				label="Password"
				type="password"
				id="password"
				autoComplete="current-password"
				helperText="Fill this field."
			/>
			<Button type="submit" fullWidth variant="contained" color="primary" className={classes.roundButton}>
				Log in
			</Button>
			<Grid item className={classes.margin}>
				Don&apos;t have an account?
				<Link to="/register">Sign Up</Link>
			</Grid>
		</form>
	);
};
