import React, { useState, useContext } from 'react';
import { Modal, Button, TextField, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { userSetingsStyles } from './userSettings.style';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_USER_MUTATION } from './queries/deleteUser';
import { AuthContext } from '../../context/authContext';

const emptyErrors = {
	currentPassword: [],
};

export function DeleteModal({ openDeleteModal, handleCloseModal }) {
	const { logout } = useContext(AuthContext);

	const styles = userSetingsStyles();
	const [errors, setErrors] = useState(emptyErrors);
	const [openFailSnackbar, setFailOpen] = useState(false);
	const [currentPassword, setCurrentPassword] = useState('');

	const [deleteUser, { loading }] = useMutation(DELETE_USER_MUTATION, {
		update(proxy, response) {
			logout();
		},
		onError(err) {
			const userDataErrors = err.graphQLErrors[0]?.extensions?.exception.errors as any[];
			if (userDataErrors) {
				setErrors(userDataErrors);
			} else setErrors(userDataErrors);
			setFailOpen(true);
			setTimeout(() => setFailOpen(false), 6000);
		},
		variables: {
			currentPassword,
		},
	});

	const onSubmit = (e) => {
		e.preventDefault();
		setErrors(emptyErrors);
		deleteUser();
	};

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={styles.modal}
				open={openDeleteModal}
				onClose={handleCloseModal}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={openDeleteModal}>
					<div className={styles.modalPaper}>
						<Typography className={styles.inputLabel} variant="h6">
							If you want to delete an account enter password and submit
						</Typography>
						<div className={styles.modalInput}>
							<TextField
								onChange={(e) => setCurrentPassword(e.target.value)}
								variant="outlined"
								className={styles.input}
							/>
							<Button
								onClick={onSubmit}
								className={styles.modalButton}
								variant="contained"
								size="medium"
								color="secondary"
							>
								Submit
							</Button>
						</div>
						{errors.currentPassword.length > 1 && (
							<p className={styles.errorsBox}>{errors.currentPassword}</p>
						)}
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
