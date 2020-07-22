import React, { useState } from 'react';
import { Grid, Typography, TextField, Box, Button } from '@material-ui/core';
import { userSetingsStyles } from './userSettings.style';
import { USER_PASSWORD_MUTATION } from './queries/changeUserPassword';
import { SuccessUpdateSnackbar } from './SuccessUpdateSnackbar';
import { FailUpdateSnackbar } from './FailUpdateSnackbar';
import { useMutation } from '@apollo/react-hooks';

const emptyErrors = {
	currentPassword: [],
	newPassword: [],
	confirmedNewPassword: [],
};

export function ChangePassword({ openChangePassword, setChangePassword }) {
	const styless = userSetingsStyles();
	const [openSuccessSnackbar, setSuccessOpen] = useState(false);
	const [openFailSnackbar, setFailOpen] = useState(false);
	const [errors, setErrors] = useState(emptyErrors);
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmedNewPassword, setConfirmedNewPassword] = useState('');

	const handleSnackbarClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setSuccessOpen(false);
		setFailOpen(false);
	};

	const [changeUserPassword, { loading }] = useMutation(USER_PASSWORD_MUTATION, {
		update(proxy, response) {
			setSuccessOpen(true);
			console.log(response);
			setTimeout(() => setSuccessOpen(false), 6000);
		},
		onError(err) {
			debugger;
			const userDataErrors = err.graphQLErrors[0]?.extensions?.exception.errors as any[];
			if (userDataErrors) {
				setErrors(userDataErrors);
			} else setErrors(userDataErrors);
			setFailOpen(true);
			setTimeout(() => setFailOpen(false), 6000);
		},
		variables: {
			changePassword: {
				currentPassword,
				newPassword,
				confirmedNewPassword,
			},
		},
	});

	const onSaveSubmit = (e) => {
		e.preventDefault();
		setErrors(emptyErrors);
		changeUserPassword();
	};

	return (
		<>
			<Grid container item className={styless.inputBox}>
				<Box borderBottom={1} className={styless.middleSectionHeader}>
					<Typography className={styless.sectionHeader} variant="h5">
						Advanced Settings
					</Typography>
				</Box>
				<Grid item className={styless.advancedSettings}>
					<Typography className={styless.inputLabel} variant="h6">
						Change password
					</Typography>
					<Button
						variant="contained"
						size="medium"
						color="primary"
						onClick={() => setChangePassword(!openChangePassword)}
					>
						{openChangePassword ? 'Cancel' : 'Change'}
					</Button>
				</Grid>
				<b>You can change your password address by providing your current password and new password</b>
				{openChangePassword && (
					<Grid item className={styless.inputBox}>
						<Typography className={styless.inputLabel} variant="h6">
							Your Password
						</Typography>
						<TextField
							onChange={(e) => setCurrentPassword(e.target.value)}
							variant="outlined"
							className={styless.input}
						/>
						<Typography className={styless.inputLabel} variant="h6">
							New password
						</Typography>
						<TextField
							onChange={(e) => setNewPassword(e.target.value)}
							variant="outlined"
							className={styless.input}
						/>
						<Typography className={styless.inputLabel} variant="h6">
							Confirm new password
						</Typography>
						<TextField
							onChange={(e) => setConfirmedNewPassword(e.target.value)}
							variant="outlined"
							className={styless.input}
						/>
						<Button
							style={{ maxWidth: '90px' }}
							variant="contained"
							color="primary"
							size="medium"
							onClick={onSaveSubmit}
						>
							Save
						</Button>
					</Grid>
				)}
			</Grid>
			{openSuccessSnackbar && (
				<SuccessUpdateSnackbar openSnackbar={openSuccessSnackbar} handleClose={handleSnackbarClose} />
			)}
			{openFailSnackbar && (
				<FailUpdateSnackbar openSnackbar={openFailSnackbar} handleClose={handleSnackbarClose} errors={errors} />
			)}
		</>
	);
}
