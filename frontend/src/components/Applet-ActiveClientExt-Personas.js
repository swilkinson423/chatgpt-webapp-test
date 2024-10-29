import React, { useContext } from 'react';

import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { SharedStateContext } from './_SharedStateComponent';

export default function AppletActiveClientPersonas() {

	const { isDarkMode, currentClientPersonas } = useContext(SharedStateContext);
	
	return (
		<Stack>
			{/* Overview Header */}
			<Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
				<h1>Target Personas Overview</h1>
			</Stack>

			<Divider />


			{/* Target Personas */}
			{currentClientPersonas?.map((persona) => (
				<Paper
					className={`client-paper ${isDarkMode && 'dark'}`}
					sx={{
						m: '0 0 16px 0',
						p: '16px 16px 32px 16px',
						boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
					}}
					key={persona.persona_id}
					elevation={3}
				>
					<Stack>
						<h1>{persona.name}</h1>
						<p>{persona.description}</p>
					</Stack>
					
				</Paper>
			))}
			
		</Stack>
	);
}
