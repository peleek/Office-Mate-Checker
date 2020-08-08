import React from 'react';
import { Grid, Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { userSetingsStyles } from './userSettings.style';

export function AddUserPhoto() {
	const styles = userSetingsStyles();
	return (
		<Grid item xs={12} md={5} xl={5} className={styles.userPhoto}>
			<AccountCircle className={styles.userIcon} />
			<label htmlFor="contained-button-file">
				<input
					accept="image/*"
					className={styles.uploadInput}
					id="contained-button-file"
					multiple
					type="file"
				/>
				<Button variant="contained" color="primary" component="span" size="large">
					Upload a picture
				</Button>
			</label>
		</Grid>
	);
}
