import { makeStyles } from '@material-ui/core';

export const useSearchbarStyles = makeStyles((theme) => ({
	root: {
		'& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': { padding: 0, width: 230 },
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: '#2c3e50',
		},
		'&:hover .MuiOutlinedInput-notchedOutline': {
			borderColor: '#2c3e50',
		},
		'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
			borderColor: '#2c3e50',
		},
	},
}));
