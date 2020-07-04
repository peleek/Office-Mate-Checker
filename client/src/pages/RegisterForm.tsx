import React, { useState } from 'react';
import { makeStyles, Grid, Button, CircularProgress, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { CustomTextField } from '../components/CustomTextField';
import { SwitchComponent } from '../components/SwitchComponent';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(0.6),
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
		marginBottom: theme.spacing(2),
		marginTop: theme.spacing(2),
	},
	roundButton: {
		borderRadius: '20px',
		width: '300px',
		fontWeight: 700,
	},
	input: {
		minWidth: '300px',
		margin: theme.spacing(1),
	},
}));

export const RegisterForm = ({ handleFormChange, errors, loading, setInputChange, onRegisterSubmit }) => {
	const [checked, setChecked] = useState(true);
	console.log(errors);
	const handleSwitchChange = () => setChecked(!checked);

	const styles = useStyles();

	return (
		<form noValidate autoComplete="off" onSubmit={onRegisterSubmit}>
			<Grid container className={styles.root} direction="column" alignItems="center" justify="center">
				<Typography className={styles.label} component="h1" variant="h5">
					Sign up
				</Typography>
				<Grid item>
					<CustomTextField
						styles={styles.input}
						errorsArray={errors.username}
						onChange={setInputChange}
						label="Username"
					/>
				</Grid>
				<Grid item>
					<CustomTextField
						styles={styles.input}
						isPassword
						errorsArray={errors.password}
						onChange={setInputChange}
						label="Password"
					/>
				</Grid>
				<Grid item>
					<CustomTextField
						styles={styles.input}
						isPassword
						errorsArray={errors.confirmPassword}
						onChange={setInputChange}
						label="Confirm Password"
					/>
				</Grid>
				<Grid item>
					<CustomTextField
						styles={styles.input}
						errorsArray={errors.email}
						onChange={setInputChange}
						label="Email"
					/>
				</Grid>
				<SwitchComponent handleSwitchChange={handleSwitchChange} checked={checked} />
				<Grid item>
					<CustomTextField
						label={checked ? 'Organization Code' : 'Organization Name'}
						onChange={setInputChange}
						errorsArray={checked ? errors.organizationCode : errors.organizationName}
						styles={styles.input}
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
					Already have an account?
					<button type="button" className={styles.buttonSpan} onClick={handleFormChange}>
						{' '}
						Sign In
					</button>
				</Grid>
			</Grid>
		</form>
	);
};
