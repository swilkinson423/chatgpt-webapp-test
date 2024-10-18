import { useContext } from 'react';
import { createTheme } from '@mui/material/styles';

import { SharedStateContext } from './../components/_SharedStateComponent';


export default function MyTheme() {

	const { isDarkMode } = useContext(SharedStateContext);

	// A custom theme for this app
	const theme = createTheme({
	cssVariables: true,
	palette: {
		mode: isDarkMode ? 'dark' : 'light',
		primary: {
		main: '#990000',
		},
		secondary: {
		main: '#00ff00',
		}
	},
	typography: {
		fontFamily: 'Roboto, Arial, sans-serif',
	},
	components: {
		ListItemText: {
		  styleOverrides: {
			root: {
			  fontSize: '2 em !important',
			  padding: '100px 20px !important',
			  backgroundColor: '#1976d2 !important',
			  '&:hover': {
				backgroundColor: '#115293',
			  },
			},
		  },
		},
	  },
	});

	return theme;

}

