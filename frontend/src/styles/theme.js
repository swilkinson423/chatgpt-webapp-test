import { useContext } from 'react';
import { createTheme } from '@mui/material/styles';

import { SharedStateContext } from './../components/_SharedStateComponent';


export default function MyTheme() {

	const { isDarkMode } = useContext(SharedStateContext);

	// Light Mode Colors
	const lightThemeColors = {
		mode: 'light',
		primary: {
			main: '#455A64',
		},
		secondary: {
			main: '#FF5722',
		},
		background: {
			default: '#f0f0f0',
			paper: '#eeeeee',
		},
		text: {
			primary: '#212121',
			secondary: '#757575',
		},
		divider: '#BDBDBD',
	};

	// Dark Mode Colors
	const darkThemeColors = {
		mode: 'dark',
		primary: {
			main: '#455A64',
		},
		secondary: {
			main: '#FF5722',
		},
		background: {
			default: '#2f2f2f',
			highlightlight: '#2a2a2a',
			highlightdark: '#333333',
			paper: '#1f1f1f',
		},
		text: {
			primary: '#FFFFFF',
			secondary: '#757575',
		},
		divider: '#BDBDBD',
	};

	// Main Theme Options
	const theme = createTheme({
		cssVariables: true,
		palette: isDarkMode ? darkThemeColors : lightThemeColors,
		typography: {
			fontFamily: 'Roboto, Arial, sans-serif',
		},
		components: {
			ListItemText: {
				styleOverrides: {
					html: {
						transition: 'width 0.8s !important',
					},
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