import React from 'react';
import { makeStyles, Grid, Switch } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	span: {
		marginRight: '13px',
		fontSize: '17px',
		display: 'flex',
		alignItems: 'center',
	},
	input: {
		minWidth: '300px',
		margin: theme.spacing(1),
	},
}));

const FontSizeTooltip = withStyles({
	tooltip: {
		fontSize: '1rem',
	},
})(Tooltip);

export const SwitchComponent = ({ checked, handleSwitchChange }) => {
	const styles = useStyles();

	return (
		<>
			<Grid item>
				<span className={styles.span}>
					Do you have an orgnization code
					<FontSizeTooltip
						title="If you don't have organization code you need to create your own organization"
						placement="top-start"
					>
						<HelpIcon />
					</FontSizeTooltip>
					<span>
						<Switch checked={checked} onChange={handleSwitchChange} color="primary" name="checked" />
					</span>
				</span>
			</Grid>
		</>
	);
};
