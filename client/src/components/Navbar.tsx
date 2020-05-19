import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';

export const NavbarComponent = (props: RouteComponentProps) => {
	const { location } = props;
	const [value, setValue] = React.useState(location.pathname);

	const handleChange = (e, newValue: string) => {
		setValue(newValue);
	};

	return (
		<AppBar position="static">
			<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
				<Tab label="home" value="/" component={Link} to="/" />
				<Tab label="login" value="/login" component={Link} to="/login" />
				<Tab label="register" value="/register" component={Link} to="/register" />
			</Tabs>
		</AppBar>
	);
};

export const Navbar = withRouter(NavbarComponent);
