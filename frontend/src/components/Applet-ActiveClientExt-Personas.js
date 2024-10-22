import React, { useContext } from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

import { SharedStateContext } from './_SharedStateComponent';

export default function AppletActiveClientPersonas() {

	const { isDarkMode, currentClient } = useContext(SharedStateContext);

	const personas = JSON.parse(currentClient.personas);

	if (!personas || personas.length === 0) {
		return <div>No personas available.</div>;
	};

	return (

		<>

			{/* Section XX - Persona Map */}
			{personas.map(persona => (
				
				
				<Paper className={`persona ${isDarkMode && 'dark'}`} elevation={3}>

					<Stack>
						
						{/* Overview */}
						<h1>{persona.name}</h1>
						<p>{persona.personaSummary}</p>
						<p>{persona.industrySummary}</p>
						<p>{persona.services}</p>


					</Stack>
				</Paper>
			))}

		</>


	);

};