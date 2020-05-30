import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';
import { UserIcon } from './UserIcon'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'


const useStyles = makeStyles((theme) => ({
	user: {
		marginRight: theme.spacing(2),
	},
	boxWidth: {
		width: '100%'
	}
}))

export const NavbarComponent = (props: RouteComponentProps) => {
	const classes = useStyles()
	const { location } = props;
	const [value, setValue] = React.useState(location.pathname);

	const handleChange = (e, newValue: string) => {
		setValue(newValue);
	};

	return (
		<AppBar position="static" >

			<Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className={classes.boxWidth}>
				<Box display="flex" p={1} className={classes.boxWidth}>
					<Box
						flexShrink={1}
						width="100%"
					>
						<Tab label="Check mate calendar" value="/" component={Link} to="/" />
						<Tab label="My calendar" value="/login" component={Link} to="/" />
						<Tab label="" value="/register" component={Link} to="/" />
					</Box>
					<Box
						flexShrink={0}
						justifyContent="flex-end"
					>
						<UserIcon styles={classes.user} />
					</Box>
				</Box>
			</Tabs>
		</AppBar >
	);
};

export const Navbar = withRouter(NavbarComponent);
