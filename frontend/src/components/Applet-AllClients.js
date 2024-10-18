import React, { useContext, useEffect } from 'react';
import axios from 'axios';

import { SharedStateContext } from './_SharedStateComponent';

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
		<div id="applet">

			{/* Title Element */}
			<h1>All Clients</h1>

			{/* Body Element */}
			{clients.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1 ).map((client, index) => (		

				<div key={"card" + client.id}>
					<h2 key={"name-" + client.id}>{client.name}</h2>
					<p key={"description-" + client.id}>{client.description}</p>
				</div>

			))}

		</div>
	);
};