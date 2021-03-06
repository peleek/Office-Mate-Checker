import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { userSetingsStyles } from './userSettings.style';

export function DeleteAccount({ handleOpenModal }) {
	const styles = userSetingsStyles();
	return (
		<Grid container item className={styles.inputBox}>
			<Grid item className={styles.advancedSettings}>
				<Typography className={styles.inputLabel} variant="h6">
					Delete your account
				</Typography>
				<Button
					variant="contained"
					size="medium"
					color="secondary"
					startIcon={<DeleteIcon />}
					onClick={handleOpenModal}
				>
					Delete
				</Button>
			</Grid>
			<b>Your account will be permanently deleted</b>
		</Grid>
	);
}
