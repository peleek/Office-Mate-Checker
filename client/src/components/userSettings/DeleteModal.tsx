import React from 'react';
import { Modal, Button, TextField, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { userSetingsStyles } from './userSettings.style';

export function DeleteModal({ openDeleteModal, handleCloseModal }) {
	const styless = userSetingsStyles();

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={styless.modal}
				open={openDeleteModal}
				onClose={handleCloseModal}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={openDeleteModal}>
					<div className={styless.modalPaper}>
						<Typography className={styless.inputLabel} variant="h6">
							If you want to delete an account enter password and submit
						</Typography>
						<div className={styless.modalInput}>
							<TextField variant="outlined" className={styless.input} />
							<Button className={styless.modalButton} variant="contained" size="medium" color="secondary">
								Submit
							</Button>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
