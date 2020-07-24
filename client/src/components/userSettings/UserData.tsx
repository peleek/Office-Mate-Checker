import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Typography, Box, Grid, TextField, Button } from '@material-ui/core';
import { userSetingsStyles } from './userSettings.style';
import { USER_DATA_MUTATION } from './queries/changeUserData';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { AuthContext } from '../../context/authContext';

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const emptyErrors = {
	username: [],
	email: [],
};

export function UserData({ openPersonalData, user, setPersonalData }) {
	const styles = userSetingsStyles();
	const [newUserName, setNewUserName] = useState(user.username);
	const [newUserEmail, setNewUserEmail] = useState(user.email);
	const [openSuccessSnackbar, setSuccessOpen] = useState(false);
	const [openFailSnackbar, setFailOpen] = useState(false);
	const [errors, setErrors] = useState(emptyErrors);
	const { login } = useContext(AuthContext);

	const handleSnackbarClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setSuccessOpen(false);
		setFailOpen(false);
	};

	const [changeUserData, { loading }] = useMutation(USER_DATA_MUTATION, {
		update(proxy, response) {
			setSuccessOpen(true);
			setTimeout(() => setSuccessOpen(false), 6000);
			login(response.data.changeUserData);
		},
		onError(err) {
			const userDataErrors = err.graphQLErrors[0]?.extensions?.exception.errors as any[];
			if (userDataErrors) {
				setErrors(userDataErrors);
			} else setErrors(userDataErrors);
			setFailOpen(true);
			setTimeout(() => setFailOpen(false), 6000);
		},
		variables: {
			userData: {
				username: newUserName,
				email: newUserEmail,
			},
		},
	});

	const onSaveSubmit = (e) => {
		e.preventDefault();
		setErrors(emptyErrors);
		changeUserData();
	};

	return (
		<>
			<Grid item className={styles.inputBox}>
				<Box borderBottom={1} className={styles.sectionLabel}>
					<Typography className={styles.sectionHeader} variant="h5">
						User Data
					</Typography>
				</Box>
				<Typography className={styles.inputLabel} variant="h6">
					Your Name:
				</Typography>
				{!openPersonalData ? (
					<p className={styles.userData}>{newUserName}</p>
				) : (
					<TextField
						onChange={(e) => setNewUserName(e.target.value)}
						defaultValue={newUserName}
						variant="outlined"
						className={styles.input}
					/>
				)}
			</Grid>
			<Grid item className={styles.inputBox}>
				<Typography className={styles.inputLabel} variant="h6">
					Email:
				</Typography>
				{!openPersonalData ? (
					<p className={styles.userData}>{newUserEmail}</p>
				) : (
					<TextField
						onChange={(e) => setNewUserEmail(e.target.value)}
						defaultValue={newUserEmail}
						variant="outlined"
						className={styles.input}
					/>
				)}
			</Grid>
			<Button
				variant="contained"
				color="primary"
				size="medium"
				onClick={() => setPersonalData(!openPersonalData)}
			>
				{openPersonalData ? 'Cancel' : 'Edit'}
			</Button>
			{openPersonalData && (
				<Button variant="contained" color="primary" size="medium" onClick={onSaveSubmit}>
					Save
				</Button>
			)}
			<Grid className={styles.errorsBox}>
				{errors.username.length >= 1 && <p>{errors.username[0]}</p>}
				{errors.email.length >= 1 && <p>{errors.email[0]}</p>}
			</Grid>

			{openSuccessSnackbar && (
				<Snackbar open={openSuccessSnackbar} onClose={handleSnackbarClose}>
					<Alert onClose={handleSnackbarClose} severity="success">
						Successfull change!
					</Alert>
				</Snackbar>
			)}
			{openFailSnackbar && (
				<Snackbar open={openFailSnackbar} onClose={handleSnackbarClose}>
					<Alert onClose={handleSnackbarClose} severity="error">
						Something went wrong, check errors!
					</Alert>
				</Snackbar>
			)}
		</>
	);
}
