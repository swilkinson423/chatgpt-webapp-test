import React, { useContext, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { SharedStateContext } from './_utils/_SharedStateComponent';

import { createGoogleDriveFolder } from '../_utils/googleDriveFunctions';


// TODO - Update the 'add client' functionality to create the full folder structure.
// TODO - Update the 'add client' functionality to populate the folders with default documents.
// TODO - Update the 'add client' functionality to create a Google Group for granting permissions to folders/docs.
// TODO - Update the 'add client' functionality to assign Google Groups (agency, client, writers) to folders permissions lists. 

// TODO - Incorporate OpenAI API functionality into the process. 
// TODO - Create a 'new client setup wizard' process that walks the user through the setup process for adding client overview info, socials, products, documents, etc. (AI assistant should provide a default option to make setup quicker.)


export default function AppletAddNewClient() {
	const { setClients, setOpenSubMenu, setActiveSidebarSubitem, setAppletViewState, setActiveClientID } = useContext(SharedStateContext);

	const [newClient, setNewClient] = useState({
		name: '',
		website: '',
		drivefolder: '',
		is_client: true,
	});

	// Handle form input for new clients
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewClient((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Create a new client
	const addClient = async () => {
		try {
			// Create a Google Drive folder for the new client
			const responseGoogleDrive = await createGoogleDriveFolder(newClient.name, 'clientFiles');
			const folderId = responseGoogleDrive.folder;

			// Update the drivefolder field with the created folder ID
			setNewClient((prev) => ({
				...prev,
				drivefolder: folderId,
			}));
			
			// Create a new client
			const postNew = await axios.post(`http://localhost:3000/companies/`, {
				...newClient,
				drivefolder: folderId,
			});

			setActiveClientID(postNew.data.data.id);

			// Update UI state and fetch clients
			const responseUI = await axios.get(`http://localhost:3000/clients/`);
			setClients(responseUI.data.data);
			
			// Reset form and navigate to new client view
			setNewClient({ name: '', website: '', drivefolder: '', is_client: true });
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
