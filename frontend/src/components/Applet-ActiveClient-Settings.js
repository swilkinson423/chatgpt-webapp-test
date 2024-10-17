import React, { useContext, useState } from 'react';
import axios from 'axios';

import { SharedStateContext } from './_SharedStateComponent';

export default function AppletActiveClientSettings() {

	const { setAppletViewState, setOpenTab, clients, setClients, setActiveClientID, currentClient, setCurrentClient  } = useContext(SharedStateContext);

	const [isEditing, setIsEditing] = useState(false);

	// Handle form input for editing clients
	const handleEditChange = (e) => {
		const { name, value } = e.target;
		setCurrentClient((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Update a client
	const updateClient = async () => {
		try {
			await axios.put(`http://localhost:3000/clients/${currentClient.id}`, currentClient)
			setClients(clients.map((client) => (client.id === currentClient.id ? currentClient : client)));
			setActiveClientID(currentClient.id);
			setAppletViewState("active-clients");
			setOpenTab('about');
		} catch (err) {
			console.error('Error updating client:', err);
			alert('Failed to update client. Please try again.');
		}
	};

	// Delete a client
	const deleteClient = async (id) => {
		try {
			await axios.delete(`http://localhost:3000/clients/${id}`);
			setClients(clients.filter((client) => client.id !== id));
			setActiveClientID("all-clients");
			setAppletViewState("all-clients");
		} catch (err) {
			console.error('Error deleting client:', err);
			alert('Failed to delete client. Please try again.');
		}
	};

	return (

		/* --+--+-- VIEW CLIENT SETTINGS --+--+-- */
		<div id="tabcontent-settings" className="view-window vert row tabcontent">

			{/* Section 01 - Topics */}
			<div className='view-section col-12'>
				<div className='row'>

					{/* Client Settings */}
					<div className="col-12">
						<h1>Client Settings</h1>
					</div>

					{/* Update Client Info */}
					<div className="view-wrapper col-md-12 col-12">
						<h2>Update Client Info</h2>
						{isEditing 
							?
							<>
							<button className="btn btn-success" onClick={updateClient}>Update Client</button>
							<button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
							</>
							:
							<button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Client</button>
						}

						{/* Client Name */}
						<h6>Name:</h6>
						<input
							type="text"
							name="name"
							placeholder="Client Name"
							className="form-control mb-3"
							value={currentClient.name}
							onChange={handleEditChange}
						/>

						{/* Client Description */}
						<h6>Description:</h6>
						<textarea
							name="description"
							placeholder="Client Description"
							className="form-control mb-3"
							value={currentClient.description}
							onChange={handleEditChange}
						/>

						{/* Client Description Add-on */}
						<h6>Description &#40;Extended&#41;:</h6>
						<textarea
							name="descriptionaddon"
							placeholder="Additional Client Information"
							className="form-control mb-3"
							value={currentClient.descriptionaddon}
							onChange={handleEditChange}
						/>

						{/* Client Website */}
						<h6>Website:</h6>
						<input
							type="text"
							name="website"
							placeholder="Client Website"
							className="form-control mb-3"
							value={currentClient.website}
							onChange={handleEditChange}
						/>

						{/* Client LinkedIn */}
						<h6>LinkedIn:</h6>
						<input
							type="text"
							name="linkedin"
							placeholder="Client LinkedIn"
							className="form-control mb-3"
							value={currentClient.linkedin}
							onChange={handleEditChange}
						/>

						{/* Client YouTube */}
						<h6>YouTube:</h6>
						<input
							type="text"
							name="youtube"
							placeholder="Client YouTube"
							className="form-control mb-3"
							value={currentClient.youtube}
							onChange={handleEditChange}
						/>

						{/* Client Twitter */}
						<h6>X &#40;Twitter&#41;:</h6>
						<input
							type="text"
							name="twitter"
							placeholder="Client X (Twitter)"
							className="form-control mb-3"
							value={currentClient.twitter}
							onChange={handleEditChange}
						/>

						{/* Client Facebook */}
						<h6>Facebook:</h6>
						<input
							type="text"
							name="facebook"
							placeholder="Client Facebook"
							className="form-control mb-3"
							value={currentClient.facebook}
							onChange={handleEditChange}
						/>

						{/* Client Instagram */}
						<h6>Instagram:</h6>
						<input
							type="text"
							name="instagram"
							placeholder="Client Instagram"
							className="form-control mb-3"
							value={currentClient.instagram}
							onChange={handleEditChange}
						/>

						{/* Client TikTok */}
						<h6>TikTok:</h6>
						<input
							type="text"
							name="tiktok"
							placeholder="Client TikTok"
							className="form-control mb-3"
							value={currentClient.tiktok}
							onChange={handleEditChange}
						/>

						{/* Client Products & Services */}
						<h6>Products & Services:</h6>
						<input
							type="text"
							name="products"
							placeholder="Client Products & Services"
							className="form-control mb-3"
							value={currentClient.products}
							onChange={handleEditChange}
						/>

						{/* Client Target Personas */}
						<h6>Target Personas:</h6>
						<textarea
							name="personas"
							placeholder="Client Target Persona"
							className="form-control mb-3"
							value={currentClient.personas}
							onChange={handleEditChange}
						/>

						{/* Delete Button */}
						<button className="btn btn-danger" onClick={() => deleteClient(currentClient.id)}>Delete</button>
						
					</div>

				</div>
			</div>

		</div>

	);
}