import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { useLazyQuery } from '@apollo/react-hooks';
import { useSearchbarStyles } from './Searchbar.style';
import { getUsersQuery } from './queries/getUsersQuery';

export const Searchbar = () => {
	const classes = useSearchbarStyles();
	const [value, setValue] = useState('');
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

	React.useEffect(() => {
		console.log(data);
	}, [data]);
	return (
		<Box display="flex" alignItems="center" width="100%" flexShrink={1}>
			<div className={classes.search}>
				<div className={classes.searchIcon}>
					<SearchIcon />
				</div>
				<InputBase
					type="text"
					value={value}
					onKeyPress={handleKeyPress}
					onChange={(e) => setValue(e.target.value)}
					placeholder="Search mate…"
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					inputProps={{ 'aria-label': 'search' }}
				/>
			</div>
		</Box>
	);
};
