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

	const renderTabView = () => {

		return (
			
			/* View All Clients */
			<div id="tabcontent-allclients" className="view-window vert tabcontent">


				{/* Section XX - Client Cards */}
				{clients.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1 ).map((client, index) => (		
				<>
					
					{/* Client Card */}
					<div className='view-section' key={index}>
						<div className='' key={index}>

							{/* Client Card Header */}
							<div className="" key={index}>
								<h1 key={index}>{client.name}</h1>
							</div>

							{/* Client Card Body */}
							<div id="description-wrapper" className="view-wrapper">
								<h2>Description</h2>
								<p>{client.description}</p>
							</div>
						</div>
					</div>
				</>
				))}

			</div>

		)
	};

	return (

		/* --+--+-- VIEW ALL CLIENTS --+--+-- */
		<div id="applet">

			{/* Header Element for Section Title & Nav Elements */}
			<div className="view-header">
				<div className="view-header title">All Clients</div>
			</div>

			{/* Body Element for Displaying Section Content */}
			<div className="view-body">
				{renderTabView()}
			</div>

		</div>
	);
};