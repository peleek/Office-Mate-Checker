import React from 'react';
import { Grid, Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { userSetingsStyles } from './userSettings.style';

export function AddUserPhoto() {
	const styless = userSetingsStyles();
	return (
		<Grid item xs={12} md={5} xl={5} className={styless.userPhoto}>
			<AccountCircle className={styless.userIcon} />
			<label htmlFor="contained-button-file">
				<input
					accept="image/*"
					className={styless.uploadInput}
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
