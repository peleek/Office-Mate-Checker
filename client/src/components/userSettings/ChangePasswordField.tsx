import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { userSetingsStyles } from './userSettings.style';

export const ChangePasswordField = ({ values, setValues }): JSX.Element => {
	const styless = userSetingsStyles();
	const [showPassword, setShowPassword] = useState(false);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<TextField className={styless.input} variant="outlined">
			<OutlinedInput
				id="outlined-adornment-password"
				type={showPassword ? 'text' : 'password'}
				value={values}
				onChange={(e) => setValues(e.target.value)}
				endAdornment={
					<InputAdornment aria-label="hello" position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={() => setShowPassword(!showPassword)}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				}
				labelWidth={70}
			/>
		</TextField>
	);
};
