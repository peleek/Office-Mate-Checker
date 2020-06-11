import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { useLazyQuery } from '@apollo/react-hooks';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSearchbarStyles } from './Searchbar.style';
import { getUsersQuery } from './queries/getUsersQuery';

interface CountryType {
	name: string;
}

export const Searchbar = () => {
	const classes = useSearchbarStyles();
	const [value, setValue] = useState('');
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState<CountryType[]>([]);

	const [getUsers, { data, loading }] = useLazyQuery(getUsersQuery);

	const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter' && value) {
			getUsers({
				variables: {
					usernamePart: value,
				},
			});
		}
	};

	useEffect(() => {
		if (data) setOptions(data.getUsers);
	}, [data]);

	return (
		<Box display="flex" alignItems="center" width="100%" flexShrink={1}>
			<div>
				<Autocomplete
					className={classes.root}
					open={open}
					onOpen={() => {
						setOpen(true);
					}}
					onClose={() => {
						setOpen(false);
					}}
					getOptionSelected={(option, username) => option === username}
					getOptionLabel={(option) => option}
					options={options}
					loading={loading}
					renderInput={(params) => (
						<TextField
							{...params}
							onChange={(e) => setValue(e.target.value)}
							variant="outlined"
							onKeyPress={handleKeyPress}
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<>
										{loading ? <CircularProgress color="inherit" size={20} /> : null}
										{params.InputProps.endAdornment}
									</>
								),
							}}
						/>
					)}
				/>
			</div>
		</Box>
	);
};
