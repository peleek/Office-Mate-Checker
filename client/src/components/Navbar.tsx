import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Searchbar } from './Searchbar/Searchbar';
import { UserIcon } from './UserIcon';
import { AuthContext } from '../context/authContext';

const useStyles = makeStyles((theme) => ({
	user: {
		marginRight: theme.spacing(2),
	},
	boxWidth: {
		width: '100%',
	},
	username: {
		fontSize: '1.1rem',
		fontWeight: 500,
	},
}));

const NavbarComponent = (props: RouteComponentProps) => {
	const classes = useStyles();
	const { location } = props;
	const [value, setValue] = React.useState(location.pathname);
	const { user } = useContext(AuthContext);

	const handleChange = (e, newValue: string) => {
		setValue(newValue);
	};

	const renderSearchbar = () => {
		return location.pathname !== '/mycalendar' && <Searchbar />;
	};

	const getTrimmedPathname = (pathname: string) => pathname.split(':')[0];

	return (
		user && (
			<AppBar position="static">
				<Box display="flex" p={1} className={classes.boxWidth}>
					<Box flexShrink={1} width="100%">
						<Tabs
							value={value === '/' ? '/mycalendar' : getTrimmedPathname(location.pathname)}
							onChange={handleChange}
							aria-label="simple tabs example"
							className={classes.boxWidth}
						>
							<Tab
								label="Check mate calendar"
								value="/matecalendar"
								component={Link}
								to="/matecalendar"
							/>
							<Tab label="My calendar" value="/mycalendar" component={Link} to="/mycalendar" />
							{renderSearchbar()}
						</Tabs>
					</Box>
					<Box display="flex" alignItems="center" className={classes.username}>
						{user.username}
					</Box>
					<Box flexShrink={0} justifyContent="flex-end">
						<UserIcon styles={classes.user} />
					</Box>
				</Box>
			</AppBar>
		)
	);
};

export const Navbar = withRouter(NavbarComponent);
