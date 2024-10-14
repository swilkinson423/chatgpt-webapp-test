import React, { useContext, useEffect } from 'react';
import axios from 'axios';

import { SharedStateContext } from './../_SharedStateComponent';

export default function AppletViewAllClient() {

	const { clients, setClients } = useContext(SharedStateContext);

	// Fetch clients on component mount
	useEffect(() => {
		fetchClients();
	}, []);

	// Fetch all clients from the back-end API
	const fetchClients = async () => {
		try {
			const response = await axios.get('http://localhost:3000/clients');
			setClients(response.data);
		} catch (err) {
			console.error('Error fetching clients:', err);
		}
	};

	return (

		/* --+--+-- VIEW ALL CLIENTS --+--+-- */
		<div id="applet-view-all" className="applet-view">

			{/* Display Clients Dashboard */}
			<div className="list-group">
				{clients.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1 ).map((client, index) => (
					<div className="list-group-item d-flex justify-content-between align-items-center" key={index}>
						<div>
							<h5>{client.name}</h5>
							<p>{client.description}</p>
						</div>
					</div>
				))}
			</div>

		</div>
	);
};