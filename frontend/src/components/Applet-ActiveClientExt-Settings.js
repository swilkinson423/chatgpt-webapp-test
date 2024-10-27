import React, { useContext, useState } from 'react';
import axios from 'axios';

import { SharedStateContext } from './_SharedStateComponent';

export default function AppletActiveClientSettings() {
	const {
		setOpenSubMenu,
		setAppletViewState,
		setOpenTab,
		clients,
		setClients,
		setActiveClientID,
		currentClient,
		setCurrentClient,
	} = useContext(SharedStateContext);

	const [isEditing, setIsEditing] = useState(false);

	// Handle form input for editing client info
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
			await axios.put(`http://localhost:3000/companies/${currentClient.id}`, currentClient);
			setClients(clients.map((client) => (client.id === currentClient.id ? currentClient : client)));
			setActiveClientID(currentClient.id);
			setAppletViewState('active-clients');
			setOpenTab('about');
			setIsEditing(false);
		} catch (err) {
			console.error('Error updating client:', err);
			alert('Failed to update client. Please try again.');
		}
	};

	// Delete a client
	const deleteClient = async () => {
		try {
			await axios.delete(`http://localhost:3000/companies/${currentClient.id}`);
			setClients(clients.filter((client) => client.id !== currentClient.id));
			setActiveClientID('all-clients');
			setAppletViewState('all-clients');
			setOpenSubMenu('none');
		} catch (err) {
			console.error('Error deleting client:', err);
			alert('Failed to delete client. Please try again.');
		}
	};

	return (
		<div id="tabcontent-settings" className="view-window vert row tabcontent">
			<div className="view-section col-12">
				<div className="row">
					<div className="col-12">
						<h1>Client Settings</h1>
					</div>

					<div className="view-wrapper col-md-12 col-12">
						<h2>Update Client Info</h2>
						{isEditing ? (
							<div>
								<button className="btn btn-success" onClick={updateClient}>Save Changes</button>
								<button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
							</div>
						) : (
							<button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Client</button>
						)}

						{isEditing && (
							<>
								{/* Client Name */}
								<h6>Name:</h6>
								<input
									type="text"
									name="name"
									placeholder="Client Name"
									className="form-control mb-3"
									value={currentClient.name || ''}
									onChange={handleEditChange}
								/>

								{/* Client Description */}
								<h6>Description:</h6>
								<textarea
									name="description"
									placeholder="Client Description"
									className="form-control mb-3"
									value={currentClient.description || ''}
									onChange={handleEditChange}
								/>

								{/* Client Description Add-on */}
								<h6>Extended Description:</h6>
								<textarea
									name="descriptionaddon"
									placeholder="Additional Client Information"
									className="form-control mb-3"
									value={currentClient.descriptionaddon || ''}
									onChange={handleEditChange}
								/>

								{/* Client Website */}
								<h6>Website:</h6>
								<input
									type="text"
									name="website"
									placeholder="Client Website"
									className="form-control mb-3"
									value={currentClient.website || ''}
									onChange={handleEditChange}
								/>
							</>
						)}

						{/* Delete Button */}
						<button className="btn btn-danger mt-3" onClick={deleteClient}>
							Delete Client
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
