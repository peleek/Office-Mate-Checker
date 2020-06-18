import React from 'react';
import Grid from '@material-ui/core/Grid';
import { ContainerForLandingpage } from './FormContainer';
import '../homepage.css';

/* eslint-disable-next-line */
const photo = require('../media/homepage-light-photo.jpg');

export const LoginAndRegister: React.FC = () => {
	return (
		<div className="ui-container">
			<Grid className="login-form" container>
				<Grid item xs={12} sm={4}>
					<ContainerForLandingpage />
				</Grid>
				<Grid item xs={12} sm={8}>
					<div className="homepage-photo">
						<img className="image" alt="schedule" src={photo} />
						<div className="img-text">
							<h1>Do you want to know when your mate is free?</h1>
						</div>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};
