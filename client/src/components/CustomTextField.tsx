import { TextField } from '@material-ui/core';
import React from 'react';

const getErrorMessage = (errorArray: Array<string>) => {
	return errorArray.length ? errorArray?.reduce((prev, curr) => `${prev} ${curr}`) : '';
};

type Props = {
	errorsArray: string[];
	label: string;
	onChange: (e) => void;
};

export const CustomTextField: React.FC<Props> = ({ errorsArray, label, onChange }) => {
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
			id="standard-required"
			label={label}
		/>
	);
};
