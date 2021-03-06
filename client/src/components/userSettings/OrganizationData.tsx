import React from 'react';
import { Grid, Typography, TextField, Box } from '@material-ui/core';
import { userSetingsStyles } from './userSettings.style';

export const OrganizationData = ({ organizationCode }) => {
	const styles = userSetingsStyles();
	return (
		<Grid item className={styles.inputBox}>
			<Box borderBottom={1} className={styles.middleSectionHeader}>
				<Typography className={styles.sectionHeader} variant="h5">
					Organization Data
				</Typography>
			</Box>
			<Typography className={styles.inputLabel} variant="h6">
				Organization code
			</Typography>
			<p className={styles.organizationData}>{organizationCode}</p>
		</Grid>
	);
};
