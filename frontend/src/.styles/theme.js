import { useContext } from 'react';
import { createTheme } from '@mui/material/styles';

import { SharedStateContext } from '../components/_utils/_SharedStateComponent';


export default function MyTheme() {

	// Get the shared state of dark or light mode
	const { isDarkMode } = useContext(SharedStateContext);
	
	// Main Theme Options
	const theme = createTheme({
		cssVariables: true,
		palette: {
			mode: isDarkMode ? 'dark' : 'light',			
			background: {
				default: isDarkMode ? '#4E5454' : '#E5E7E7',
				paper: isDarkMode ? '#252C2F' : '#CBCFCF',
			},
			primary: {
				main: '#FF7F00',
				contrastText: '#fff',
			},
			secondary: {
				main: '#FF6666',
				contrastText: '#000',
			},
		},
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