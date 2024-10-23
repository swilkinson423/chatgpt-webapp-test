import React, { useContext } from 'react';

import Stack from '@mui/material/Stack';

import { SharedStateContext } from './_SharedStateComponent';

export default function AppletActiveClientDocs() {

	const { isDarkMode, currentClient } = useContext(SharedStateContext);


	return (
		<Stack>

			{/* Overview Header */}
			<Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>

				{/* Header Title */}
				<h1>Lorem-------------------</h1>

			</Stack>
			
			
		</Stack>

	);
};