import React, { useContext, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { SharedStateContext } from './_SharedStateComponent';

export default function AppletAddNewClient() {
	const { setClients, setOpenSubMenu, setActiveSidebarSubitem, setAppletViewState, setActiveClientID } = useContext(SharedStateContext);

	const [newClient, setNewClient] = useState({
		name: '',
		website: '',
		is_client: true,
	});

	// Handle form input for new clients
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewClient((prev) => ({ ...prev, [name]: value }));
	};

	// Create a new client
	const addClient = async () => {
		try {
			const postNew = await axios.post(`http://localhost:3000/companies/`, newClient);
			setActiveClientID(postNew.data.data.id); // Assuming response is `{ success: true, data: { id: ... } }`

			// Update UI state and fetch clients
			const response = await axios.get(`http://localhost:3000/clients/`);
			setClients(response.data.data);
			
			// Reset form and navigate to new client view
			setNewClient({ name: '', website: '', is_client: true });
			setOpenSubMenu('active-clients');
			setActiveSidebarSubitem(`active-clients-${postNew.data.data.id}`);
			setAppletViewState('active-clients');
		} catch (err) {
			console.error('Error adding client:', err);
			alert('Failed to add client. Please try again.');
		}
	};

	return (
		<Box id='applet'>
			{/* Title Element */}
			<Stack className='view-header'>
				<Typography variant="h1">Add New Client</Typography>
			</Stack>

			{/* Body Element */}
			<Box className='view-body'>
				{/* New Client Form Header */}
				<Typography variant="h2" gutterBottom>Company Info:</Typography>

				{/* Client Name */}
				<TextField
					label="Client Name"
					name="name"
					variant="outlined"
					fullWidth
					margin="normal"
					value={newClient.name}
					onChange={handleInputChange}
					placeholder="Enter client name"
				/>

				{/* Client Website */}
				<TextField
					label="Company Website"
					name="website"
					variant="outlined"
					fullWidth
					margin="normal"
					value={newClient.website}
					onChange={handleInputChange}
					placeholder="Enter client website"
				/>

				{/* Submit Button */}
				<Button
					variant="contained"
					color="primary"
					onClick={addClient}
					disabled={!newClient.name || !newClient.website}
					sx={{ mt: 2 }}
				>
					Add Client
				</Button>
			</Box>
		</Box>
	);
};
