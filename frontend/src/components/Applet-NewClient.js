import React, { useContext, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { SharedStateContext } from './_SharedStateComponent';

export default function AppletAddNewClient() {

	const { setClients, setOpenSubMenu, setActiveSidebarSubitem, setAppletViewState, setActiveClientID } = useContext(SharedStateContext);

	const newClientTemplate = {
		name: '', 
		website: '', 
		description: '', 
		descriptionaddon: '',
		products: '', 
		personas: '', 
		linkedin: '', 
		youtube: '',
		twitter: '', 
		facebook: '', 
		instagram: '', 
		tiktok: ''
	}

	const [newClient, setNewClient] = useState(newClientTemplate);

	// Handle form input for new clients
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewClient((prev) => ({ ...prev, [name]: value }));
	};

	// Create a new client
	const addClient = async () => {
		try {
			const postNew = await axios.post(`http://localhost:3000/clients/`, newClient);
			const response = await axios.get(`http://localhost:3000/clients/`);
				setActiveClientID(postNew.data.id);
				setOpenSubMenu('active-clients');
				setActiveSidebarSubitem('active-clients-'+postNew.data.id);
				setAppletViewState('active-clients');
				setClients(response.data);
				setNewClient(newClientTemplate);
		} catch (err) {
			console.error('Error adding client:', err);
			alert('Failed to add client. Please try again.');
		}
	};

	return (

		<Box id='applet'>
			
			{/* Title Element */}
			<Stack className='view-header'>
				<h1>Add New Client</h1>
			</Stack>


			{/* Body Element */}
			<Box className='view-body'>

				{/* New Client Form Header */}
				<div>
					<h2>Company Info:</h2>
				</div>	

				{/* Client Name */}
				<h6>Name:</h6>
				<input
					type="text"
					name="name"
					placeholder="Client Name"
					className="form-control mb-3"
					value={newClient.name}
					onChange={handleInputChange}
				/>

				{/* Client Website */}
				<h6>Company Website:</h6>
				<input
					type="text"
					name="website"
					placeholder="Client Website"
					className="form-control mb-3"
					value={newClient.website}
					onChange={handleInputChange}
				/>

				{/* Submit Button */}
				<button onClick={addClient}>Add Client</button>

			</Box>

		</Box>
	);
};