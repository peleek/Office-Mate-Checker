import React, { useContext } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useDateModalContext } from '../../context/dateModalContext';
import { ModalDatePicker } from '../ModalDatePicker';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			border: '2px solid #000',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
	})
);

export const EventModal = () => {
	const { open, setOpen } = useDateModalContext();

	const styles = useStyles();

	const body = (
		<div className={styles.paper}>
			<ModalDatePicker />
		</div>
	);

	return (
		<Modal
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			closeAfterTransition
			className={styles.modal}
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={open}>{body}</Fade>
		</Modal>
	);
};
