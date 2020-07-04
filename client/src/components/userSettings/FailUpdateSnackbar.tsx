import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function FailUpdateSnackbar({ handleClose, openSnackbar, errors }) {
	return (
		<div>
			<Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error">
					{errors.email && <p>{errors.email[0]}</p>}
					{errors.username && <p>{errors.username[0]}</p>}
				</Alert>
			</Snackbar>
			<Alert severity="error">
				{errors.email && <p>{errors.email[0]}</p>}
				{errors.username && <p>{errors.username[0]}</p>}
			</Alert>
		</div>
	);
}
