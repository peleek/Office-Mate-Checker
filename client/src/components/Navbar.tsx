import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';
import { UserIcon } from './UserIcon'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import { Calendar } from '../pages/Calendar';
import { AuthContext } from '../context/authContext';


const useStyles = makeStyles((theme) => ({
	user: {
		marginRight: theme.spacing(2),
	},
	boxWidth: {
		width: '100%'
	}
}))

const NavbarComponent = (props: RouteComponentProps) => {
	const classes = useStyles()
	const { location } = props;
	const [value, setValue] = React.useState(location.pathname);
	const { user } = useContext(AuthContext);

	const handleChange = (e, newValue: string) => {
		setValue(newValue);
	};

	return user && (
		<AppBar position="static" >

			<Box display="flex" p={1} className={classes.boxWidth}>
				<Box
					flexShrink={1}
					width="100%"
				>
					<Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className={classes.boxWidth}>
						<Tab label="Check mate calendar" value="/matecalendar" component={Link} to="/matecalendar" />
						<Tab label="My calendar" value="/mycalendar" component={Link} to="/mycalendar" />
					</Tabs>
				</Box>
				<Box
					flexShrink={0}
					justifyContent="flex-end"
				>
					<UserIcon styles={classes.user} />
				</Box>
			</Box>
		</AppBar >
	);
};

export const Navbar = withRouter(NavbarComponent);
