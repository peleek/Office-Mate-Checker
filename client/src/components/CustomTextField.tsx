import { TextField } from '@material-ui/core';
import React from 'react';

const getErrorMessage = (errorArray: Array<string>) => {
	return errorArray.length ? errorArray?.reduce((prev, curr) => `${prev} ${curr}`) : ' ';
};

type Props = {
	errorsArray: string[];
	label: string;
	onChange: (e) => void;
	isPassword?: boolean;
	styles?: string;
};

export const CustomTextField: React.FC<Props> = ({ errorsArray, label, onChange, isPassword, styles }) => {
	return (
		<TextField
			error={!!errorsArray.length}
			helperText={getErrorMessage(errorsArray)}
			variant="outlined"
			name={label
				.split(' ')
				.map((el, index) => (index ? el : el.toLowerCase()))
				.join('')}
			onChange={onChange}
			required
			type={isPassword ? 'password' : 'text'}
			id="standard-required"
			label={label}
			className={styles}
		/>
	);
};
