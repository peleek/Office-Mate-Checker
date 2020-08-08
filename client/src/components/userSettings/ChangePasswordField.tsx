import React, { useState } from 'react';
import { TextField, IconButton, OutlinedInput, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { userSetingsStyles } from './userSettings.style';

export const ChangePasswordField = ({ values, setValues }): JSX.Element => {
	const styles = userSetingsStyles();
	const [showPassword, setShowPassword] = useState(false);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<TextField className={styles.input} variant="outlined">
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
