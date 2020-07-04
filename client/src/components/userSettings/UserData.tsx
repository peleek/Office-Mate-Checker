import React from 'react';
import { Grid, Typography, TextField, Button, Box } from '@material-ui/core';
import { userSetingsStyles } from './userSettings.style';

export function UserData({ openPersonalData, user, setPersonalData }) {
	const styless = userSetingsStyles();

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
					<p className={styless.userData}>{user.username}</p>
				) : (
					<TextField defaultValue={user.username} variant="outlined" className={styless.input} />
				)}
			</Grid>
			<Grid item className={styless.inputBox}>
				<Typography className={styless.inputLabel} variant="h6">
					Email:
				</Typography>
				{!openPersonalData ? (
					<p className={styless.userData}>{user.email}</p>
				) : (
					<TextField defaultValue={user.email} variant="outlined" className={styless.input} />
				)}
			</Grid>
			<Button variant="contained" color="primary" size="large" onClick={() => setPersonalData(!openPersonalData)}>
				{openPersonalData ? 'Cancel' : 'Edit'}
			</Button>
		</>
	);
}
