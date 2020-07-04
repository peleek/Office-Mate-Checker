import React from 'react';
import { Grid, Typography, TextField, Box, Button } from '@material-ui/core';
import { userSetingsStyles } from './userSettings.style';

export function ChangePassword({ openChangePassword, setChangePassword }) {
	const styless = userSetingsStyles();
	return (
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
					<TextField variant="outlined" className={styless.input} />
					<Typography className={styless.inputLabel} variant="h6">
						New password
					</Typography>
					<TextField variant="outlined" className={styless.input} />
					<Typography className={styless.inputLabel} variant="h6">
						Confirm new password
					</Typography>
					<TextField variant="outlined" className={styless.input} />
				</Grid>
			)}
		</Grid>
	);
}
