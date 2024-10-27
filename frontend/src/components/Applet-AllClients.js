import React, { useContext, useEffect } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { SharedStateContext } from './_SharedStateComponent';

export default function AppletViewAllClient() {

	const { clients, setClients } = useContext(SharedStateContext);

	// Fetch clients on component mount
	useEffect(() => {
		fetchClients();
	}, []);

	// Fetch all clients from the backend API
	const fetchClients = async () => {
		try {
			const response = await axios.get('http://localhost:3000/clients');
			setClients(response.data.data); // Access the 'data' property as per updated API response format
		} catch (err) {
			console.error('Error fetching clients:', err);
		}
	};

	return (
		<Box id='applet'>
			{/* Title Element */}
			<Stack className='view-header'>
				<h1>All Clients</h1>
			</Stack>

			{/* Body Element */}
			<Box className='view-body'>
				{clients
					?.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
					.map((client) => (
						<div key={"card-" + client.id} className="client-card">
							<h2 key={"name-" + client.id}>{client.name}</h2>
							<p key={"description-" + client.id}>{client.description || "No description available"}</p>
							<Divider sx={{ my: 2 }} />
						</div>
				))}
			</Box>
		</Box>
	);
};
