import React, { useContext } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { SharedStateContext } from './../_SharedStateComponent';

import { deleteClient } from './../../utils/databaseFunctions';

export default function AppletActiveClientSettings() {
	
	// Shared States
	const { 
		currentClientOverview, 
		setClients,
		setActiveClientID, 
		setAppletViewState, 
		setOpenSubMenu, 
		setIsEditing,
	} = useContext(SharedStateContext);
  

	// Delete a client
	const handleDelete = async () => {
		await deleteClient(currentClientOverview.id, currentClientOverview.drivefolder);
		setClients(clients.filter((client) => client.id !== client_id));
		setActiveClientID('all-clients');
		setAppletViewState('all-clients');
		setOpenSubMenu('none');
		setIsEditing(null);
	};


	return (

		<Stack sx={{ justifyContent: 'space-between' }} spacing={2}>
		
			{/* Header Section */}
			<Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
				
				{/* Title */}
				<Typography 
					variant='h4' 
					sx={{ 
						maxWidth: '40%', 
						overflow: 'hidden', 
						whiteSpace: 'nowrap', 
						textOverflow: 'ellipsis' 
					}}
				>
					Settings:
				</Typography>

				{/* Button Links */}
				<Stack direction="row" spacing={1} sx={{ maxWidth: '60%'}}>
					
					{/* Delete Button */}
					<Button sx={{ width: '200px' }} variant="contained" color="error" onClick={handleDelete}>Delete Client</Button>

				</Stack>

			</Stack>
			
			{/* Body Section */}
			<Typography variant='p' sx={{ color: '#ff0000' }}>{"{Pending Development}"}</Typography>	
			
		</Stack>
	);
};