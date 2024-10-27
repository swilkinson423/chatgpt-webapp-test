import React, { useContext } from 'react';
import { SharedStateContext } from './_SharedStateComponent';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function AppletSettings() {
	const { isDarkMode, setIsDarkMode } = useContext(SharedStateContext);

	// Toggle Dark Mode setting
	const handleDarkModeToggle = () => {
		setIsDarkMode(!isDarkMode);
	};

	return (
		<Box id='applet'>
			{/* Title Element */}
			<Stack className='view-header'>
				<h1>Settings</h1>
			</Stack>

			{/* Body Element */}
			<Box className='view-body'>
				<Typography variant="h2" gutterBottom>Change UI Color</Typography>
				<FormControlLabel
					control={
						<Switch
							checked={isDarkMode}
							onChange={handleDarkModeToggle}
							color="primary"
						/>
					}
					label={isDarkMode ? 'Dark Mode On' : 'Dark Mode Off'}
				/>
			</Box>
		</Box>
	);
};
