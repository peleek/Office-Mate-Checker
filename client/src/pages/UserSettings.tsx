import React, { useContext } from 'react';
import { makeStyles, Grid, Typography, TextField, Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { AuthContext } from '../context/authContext';
// import { UploadIcon } from '../media/upload-icon';

// const border = 'background-image: url(
// 	"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='7' ry='7' stroke='black' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='34' stroke-linecap='square'/%3e%3c/svg%3e"
// )'

const useStyles = makeStyles((theme) => ({
	userSettingsContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: '100vh',
		width: '90%',
	},
	formContainer: {
		backgroundColor: '#ffffff',
		borderRadius: '3px',
		paddingLeft: theme.spacing(7),
		paddingRight: theme.spacing(7),
		paddingTop: theme.spacing(5),
		paddingBottom: theme.spacing(5),
		webkitBoxShadow: `0px 0px 6px 4px rgba(0,0,0,0.20)`,
		mozBoxShadow: `0px 0px 6px 4px rgba(0,0,0,0.20)`,
		boxShadow: `0px 0px 6px 4px rgba(0,0,0,0.20)`,
	},
	inputBox: {
		marginBottom: '25px',
		mixWidth: '300px',
		maxWidth: '450px',
		display: 'grid',
	},
	input: {
		margin: '5px 0px',
		minWidth: '300px',
		maxWidth: '450px',
	},
	header: {
		paddingTop: theme.spacing(5),
		paddingBottom: theme.spacing(2),
		alignSelf: 'start',
		fontWeight: 600,
	},
	changeButton: {
		justifySelf: 'end',
	},
	inputLabel: {
		fontWeight: 600,
	},
	userPhoto: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		// backgroundImage: border,
		// borderRadius: '7px',
	},
	userIcon: {
		width: '50%',
		height: '50%',
	},
	uploadInput: {
		display: 'none',
	},
}));

export function UserSettings() {
	const { user } = useContext(AuthContext);
	console.log(user.email);
	const styless = useStyles();
	return (
		<Grid container className={styless.userSettingsContainer}>
			<Grid container item direction="column" className={styless.paper}>
				<Typography variant="h4" className={styless.header}>
					Account Settings
				</Typography>
				<Grid item container xs={12} md={12} xl={12} className={styless.formContainer} direction="row">
					<Grid item xs={8} md={7} xl={7}>
						<form noValidate autoComplete="off">
							<Grid item className={styless.inputBox}>
								<Typography className={styless.inputLabel} variant="h6">
									Your Name
								</Typography>
								<TextField variant="outlined" className={styless.input} />
								<p className={styless.changeButton}>Change</p>
							</Grid>
							<Grid item className={styless.inputBox}>
								<Typography className={styless.inputLabel} variant="h6">
									Email
								</Typography>
								<TextField defaultValue={user.username} variant="outlined" className={styless.input} />
								<p className={styless.changeButton}>Change</p>
							</Grid>
							<Grid item className={styless.inputBox}>
								<Typography className={styless.inputLabel} variant="h6">
									Password
								</Typography>
								<TextField variant="outlined" className={styless.input} />
								<p className={styless.changeButton}>Change</p>
							</Grid>
							<Grid item className={styless.inputBox}>
								<Typography className={styless.inputLabel} variant="h6">
									Organization code
								</Typography>
								<TextField variant="outlined" className={styless.input} />
							</Grid>
							<Grid item className={styless.inputBox}>
								<Typography className={styless.inputLabel} variant="h6">
									Delete your account
								</Typography>
								<b>Your account will be permanently deleted</b>
							</Grid>
							<Button variant="contained" color="primary" size="large">
								Save
							</Button>
						</form>
					</Grid>
					<Grid item xs={4} md={5} xl={5} className={styless.userPhoto}>
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
		</Grid>
	);
}
