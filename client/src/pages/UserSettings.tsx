import React from 'react';
import { makeStyles, Grid, Typography, TextField, Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: '100vh',
	},
	formContainer: {
		backgroundColor: '#ffffff',
		width: '90%',
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
		alignSelf: 'center',
	},
	changeButton: {
		justifySelf: 'end',
	},
	inputLabel: {
		fontWeight: 600,
	},
	userPhoto: {
		border: '1px solid red',
	},
}));

export function UserSettings() {
	const styless = useStyles();
	return (
		<Grid container direction="column" alignItems="center" justify="center" className={styless.paper}>
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
							<TextField variant="outlined" className={styless.input} />
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
								Delete account
							</Typography>
							<b>Your account will be permanently deleted</b>
						</Grid>
						<Button variant="contained" color="primary" size="large">
							Save
						</Button>
					</form>
				</Grid>
				<Grid item xs={4} md={5} xl={5} className={styless.userPhoto}>
					<AccountCircle fontSize="large" />
					html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
					acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
					sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
					caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption
				</Grid>
			</Grid>
		</Grid>
	);
}
