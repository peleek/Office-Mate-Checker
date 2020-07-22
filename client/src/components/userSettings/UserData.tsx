import React, { useState, useContext } from 'react';
import { Grid, Typography, TextField, Button, Box } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { userSetingsStyles } from './userSettings.style';
import { USER_DATA_MUTATION } from './queries/changeUserData';
import { SuccessUpdateSnackbar } from './SuccessUpdateSnackbar';
import { FailUpdateSnackbar } from './FailUpdateSnackbar';
import { AuthContext } from '../../context/authContext';

const emptyErrors = {
	username: [],
	email: [],
};

export function UserData({ openPersonalData, user, setPersonalData }) {
	const styless = userSetingsStyles();
	const [newUserName, setNewUserName] = useState(user.username);
	const [newUserEmail, setNewUserEmail] = useState(user.email);
	const [openSuccessSnackbar, setSuccessOpen] = useState(false);
	const [openFailSnackbar, setFailOpen] = useState(false);
	const [errors, setErrors] = useState(emptyErrors);
	const {login} = useContext(AuthContext)

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
			login(response.data.changeUserData)
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
			<Grid item className={styless.inputBox}>
				<Box borderBottom={1} className={styless.sectionLabel}>
					<Typography className={styless.sectionHeader} variant="h5">
						User Data
					</Typography>
				</Box>
				<Typography className={styless.inputLabel} variant="h6">
					Your Name:
				</Typography>
				{!openPersonalData ? (
					<p className={styless.userData}>{newUserName}</p>
				) : (
					<TextField
						onChange={(e) => setNewUserName(e.target.value)}
						defaultValue={newUserName}
						variant="outlined"
						className={styless.input}
					/>
				)}
			</Grid>
			<Grid item className={styless.inputBox}>
				<Typography className={styless.inputLabel} variant="h6">
					Email:
				</Typography>
				{!openPersonalData ? (
					<p className={styless.userData}>{newUserEmail}</p>
				) : (
					<TextField
						onChange={(e) => setNewUserEmail(e.target.value)}
						defaultValue={newUserEmail}
						variant="outlined"
						className={styless.input}
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
			{openSuccessSnackbar && (
				<SuccessUpdateSnackbar openSnackbar={openSuccessSnackbar} handleClose={handleSnackbarClose} />
			)}
			{openFailSnackbar && (
				<FailUpdateSnackbar openSnackbar={openFailSnackbar} handleClose={handleSnackbarClose} errors={errors} />
			)}
		</>
	);
}
