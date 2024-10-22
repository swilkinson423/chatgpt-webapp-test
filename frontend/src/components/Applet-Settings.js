import React, { useContext, useState, useEffect } from 'react';
import { SharedStateContext } from './_SharedStateComponent';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export default function AppletSettings(){

	const { isDarkMode, setIsDarkMode } = useContext(SharedStateContext);
	
	return (
		
		<Box id='applet'>

			{/* Title Element */}
			<Stack className='view-header'>
				<h1>Settings</h1>
			</Stack>


			{/* Body Element */}
			<Box className='view-body'>
				<h2>Change UI Color</h2>
				<button onClick={() => setIsDarkMode(!isDarkMode)}>{isDarkMode ? 'Turn Dark Mode Off': 'Turn Dark Mode On'}</button>
			</Box>

		</Box>
	);
};