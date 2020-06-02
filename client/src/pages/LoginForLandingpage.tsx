import React from 'react';
import Typography from '@material-ui/core/Typography';
// import { Link } from 'react-router-dom';
import { makeStyles, Button, CircularProgress, Grid } from '@material-ui/core';
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
		margin: theme.spacing(2),
	},
	margin: {
		marginTop: theme.spacing(4),
	},
	buttonSpan: {
		textDecoration: 'underline',
		cursor: 'pointer',
		color: '#069',
		background: 'none',
		border: 'none',
	},
}));

export const LoginForLandingpage = ({ setInputChange, errors, loading, handleFormChange }) => {
	const classes = useStyles();
	return (
		<Grid container className={classes.paper} direction="column" alignItems="center" justify="center">
			<Typography className={classes.label} component="h1" variant="h5">
				Sign in
			</Typography>
			<CustomTextField
				styles={classes.input}
				label="Username"
				onChange={setInputChange}
				errorsArray={errors.username}
			/>
			<CustomTextField
				isPassword
				styles={classes.input}
				label="Password"
				errorsArray={errors.password}
				onChange={setInputChange}
			/>
			{loading ? (
				<CircularProgress />
			) : (
				<Button type="submit" fullWidth variant="outlined" color="primary" className={classes.roundButton}>
					Login
				</Button>
			)}
			{errors.server.length
				? errors.server.map((el) => (
						<Alert className={classes.alert} severity="error">
							{el}
						</Alert>
				  ))
				: null}
			<Grid item className={classes.margin}>
				Don&apos;t have an account?
				{/* <Link to="/register"> Sign Up</Link> */}
				<button type="button" className={classes.buttonSpan} onClick={handleFormChange}>
					{' '}
					Sign Up
				</button>
			</Grid>
		</Grid>
	);
};
