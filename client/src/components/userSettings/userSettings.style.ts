import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const userSetingsStyles = makeStyles((theme: Theme) =>
	createStyles({
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
			minWidth: '300px',
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
		inputLabel: {
			fontWeight: 400,
		},
		userPhoto: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		userIcon: {
			width: '50%',
			height: '50%',
		},
		uploadInput: {
			display: 'none',
		},
		advancedSettings: {
			display: 'flex',
			justifyContent: 'space-between',
			marginBottom: theme.spacing(2),
		},
		sectionLabel: {
			marginTop: theme.spacing(2),
		},
		sectionHeader: {
			fontWeight: 550,
		},
		middleSectionHeader: {
			marginTop: theme.spacing(4),
			marginBottom: theme.spacing(2),
		},
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		modalPaper: {
			backgroundColor: theme.palette.background.paper,
			border: '2px solid #000',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
		modalInput: {
			display: 'flex',
			marginTop: theme.spacing(2),
		},
		modalButton: {
			marginLeft: theme.spacing(1),
			margin: '5px',
		},
		userData: {
			fontSize: '18px',
		},
	})
);
