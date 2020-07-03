import React, { useContext, useState } from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import { DeleteModal } from '../components/userSettings/DeleteModal';
import { userSetingsStyles } from '../components/userSettings/userSettings.style';
import { AuthContext } from '../context/authContext';

export function UserSettings() {
	const [openChangePassword, setChangePassword] = useState(false);
	const [openDeleteModal, setDeleteModalOpen] = useState(false);
	const [openPersonalData, setPersonalData] = useState(false);
	const { user } = useContext(AuthContext);
	const styless = userSetingsStyles();

	const handleOpenModal = () => {
		setDeleteModalOpen(true);
	};

	const handleCloseModal = () => {
		setDeleteModalOpen(false);
	};

	return (
		<Grid container className={styless.userSettingsContainer}>
			<Grid container item direction="column" className={styless.paper}>
				<Typography variant="h4" className={styless.header}>
					Account Settings
				</Typography>
				<Grid item container xs={12} md={12} xl={12} className={styless.formContainer} direction="row">
					<Grid item xs={12} md={7} xl={7}>
						<form noValidate autoComplete="off">
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
									<TextField
										defaultValue={user.username}
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
									<p className={styless.userData}>{user.email}</p>
								) : (
									<TextField defaultValue={user.email} variant="outlined" className={styless.input} />
								)}
							</Grid>
							<Button
								variant="contained"
								color="primary"
								size="large"
								onClick={() => setPersonalData(!openPersonalData)}
							>
								{openPersonalData ? 'Cancel' : 'Edit'}
							</Button>
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
								<b>
									You can change your password address by providing your current password and new
									password
								</b>
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
							<Grid container item className={styless.inputBox}>
								<Grid item className={styless.advancedSettings}>
									<Typography className={styless.inputLabel} variant="h6">
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
						</form>
					</Grid>
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
				</Grid>
			</Grid>
			<DeleteModal openDeleteModal={openDeleteModal} handleCloseModal={handleCloseModal} />
		</Grid>
	);
}
