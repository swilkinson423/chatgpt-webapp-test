import React, { useContext, useState } from 'react';
import axios from 'axios';

import { SharedStateContext } from './../_SharedStateComponent';

export default function AppletAddNewClient() {

	const { setClients, setAppletViewState, setActiveClientID } = useContext(SharedStateContext);

	const newClientTemplate = {
		name: '', 
		website: '', 
		description: '', 
		descriptionaddon: '',
		products: '[{}]', 
		personas: '[{}]', 
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
				setAppletViewState('active-clients');
				setClients(response.data);
				setNewClient(newClientTemplate);
		} catch (err) {
			console.error('Error adding client:', err);
			alert('Failed to add client. Please try again.');
		}
	};

	return (

		/* --+-- ADD NEW CLIENT --+-- */
		<div id="applet-add-new" className="applet-view">

			{/* Header */}
			<h2 className="mb-3">Add New Client</h2>

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
			<button className="btn btn-primary" onClick={addClient}>Add Client</button>

		</div>
	);
};