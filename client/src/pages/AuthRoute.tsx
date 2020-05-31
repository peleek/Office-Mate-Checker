import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

type Props = {
	component: React.Component | React.FunctionComponent;
	noAccess?: boolean;
};

export const AuthRoute: React.FC<Props & RouteProps> = ({ component: Component, noAccess, ...rest }) => {
	const { user } = useContext(AuthContext);
	const shouldDisplayComponent = noAccess ? user : !user;
	return (
		<Route
			{...rest}
			render={(props) => (shouldDisplayComponent ? <Component {...props} /> : <Redirect to="/" />)}
		/>
	);
};
