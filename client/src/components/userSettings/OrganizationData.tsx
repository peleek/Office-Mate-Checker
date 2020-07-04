import React from 'react';
import { Grid, Typography, TextField, Box } from '@material-ui/core';
import { userSetingsStyles } from './userSettings.style';

export function OrganizationData({ user }) {
	const styless = userSetingsStyles();
	return (
		<Grid item className={styless.inputBox}>
			<Box borderBottom={1} className={styless.middleSectionHeader}>
				<Typography className={styless.sectionHeader} variant="h5">
					Organization Data
				</Typography>
			</Box>
			<Typography className={styless.inputLabel} variant="h6">
				Organization code
			</Typography>
			<TextField variant="outlined" className={styless.input} />
		</Grid>
	);
}
