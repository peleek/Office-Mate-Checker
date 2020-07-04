import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function SuccessUpdateSnackbar({ handleClose, openSnackbar }) {
	return (
		<div>
			<Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success">
					successfull change!
				</Alert>
			</Snackbar>
			<Alert severity="success">successfull change!</Alert>
		</div>
	);
}
