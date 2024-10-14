import React, { useContext, useEffect } from 'react';

import { SharedStateContext } from './_SharedStateComponent';

import { ReactComponent as Icon_Sidebar } from "./../assets/layout-sidebar-inset.svg"
import { ReactComponent as Caret } from "./../assets/caret-down-fill.svg"
import { ReactComponent as AddClient } from "./../assets/person-fill-add.svg"

export default function Sidebar() {

	const { setAppletViewState, clients, activeClientID, setActiveClientID } = useContext(SharedStateContext);

	// Updates the active view of the Applet.
	function SetView(event, view, clientID) {
		try {

			toggleActiveElementsOff();
			
			// Set selected element to active.
			const newActiveElement = document.getElementById(event.currentTarget.id);
			newActiveElement.classList.add("activeSidebar");

			setAppletViewState(view);
			setActiveClientID(clientID);

		} catch (err) {
			console.error('Error setting applet view from navbar:', err);
		}
	}

	// Remove Active Status from All Elements.
	const toggleActiveElementsOff = () => {
		const activeElements = document.getElementsByClassName("activeSidebar");
		Array.prototype.forEach.call(activeElements, (activeElement) => {
            activeElement.classList.remove("activeSidebar");
        });
	}

	//Fetch clients on component mount
	useEffect(() => {
        FetchClientsNavbar();
    }, [clients, activeClientID]);

	// Fetch all clients from the back-end API
	function FetchClientsNavbar() {

		return clients
			// .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1 ))
			.map((client) => ( 
				<div 
					id={`sidebar-client-${client.id}`} 
					className={`sidebar-subitem ${client.id === activeClientID ? 'activeSidebar' : ''}`} 
					key={`client-${client.id}`}
					onClick={(event) => SetView(event, 'active-clients', client.id)}
				>
					
					<div className="sidebar-active-state-wrapper" key={`wrapper-${client.id}`}>
						{client.id === activeClientID && (
							<div className="active-state-icon" key={`icon-${client.id}`}>
								<Caret key={`caret-${client.id}`} />
							</div>
						)}
					</div>
					
					<div className="sidebar-item-name" key={`name-${client.id}`}>
                        {client.name}
                    </div>

				</div>
			));
			
	};



	return (
		<>
			{/* SIDEBAR */}
			<nav id="sidebar" className="collapse collapse-horizontal">
				<div id="sidebar-wrapper">

					{/* Display Client List */}
					<div id="nav-clients" className="sidebar-section">
						
						<div className="sidebar-item collapsed" data-bs-toggle="collapse" data-bs-target="#client-list" aria-expanded="false" aria-controls="client-list">
							<div className="sidebar-item-name">Clients</div>
							<div id="client-list-toggle" className="sidebar-item-icon sidebar-item-toggle"><Caret /></div>
						</div>
						
						<div id="client-list" className="sidebar-item collapse">

							{/* Button for 'all clients' view */}
							<div id="nav-all-clients" className="sidebar-subitem activeSidebar" onClick={(event) => SetView(event, "all-clients", null)}>
								<div className="sidebar-active-state-wrapper">
									<div className="active-state-icon"><Caret /></div>
								</div>
								<div className="sidebar-item-name">View All Clients</div>
								<div className="sidebar-item-icon"><AddClient /></div>
							</div>
							
							{/* Buttons for individual client views */}
							{FetchClientsNavbar()}
							
							{/* Button for 'add new client' */}
							<div id="nav-new-client" className="sidebar-subitem" onClick={(event) => SetView(event, "new-client", null)}>
								<div className="sidebar-active-state-wrapper">
									<div className="active-state-icon"><Caret /></div>
								</div>
								<div className="sidebar-item-name">New Client</div>
								<div className="sidebar-item-icon"><AddClient /></div>
							</div>
						</div>
					</div>
					

					{/* Settings Section */}
					<div id="nav-settings-section" className="sidebar-section">
						
						<div className="sidebar-item" onClick={(event) => SetView(event, "settings", null)}>
							<div className="sidebar-item-name">Settings</div>
						</div>

					</div>


					{/* Sample Sidebar Section */}
					<div id="nav-sample-section" className="sidebar-section">
						
						<div className="sidebar-item" onClick={(event) => SetView(event, "", null)}>
							<div className="sidebar-item-name">Sample</div>
						</div>

					</div>
		
					{/* Sample Sidebar Footer */}
					<div id="nav-sample-footer" className="sidebar-section">
						<div className="sidebar-item" onClick={(event) => SetView(event, "", null)}>
							<div className="sidebar-item-name">Sample Footer</div>
						</div>
					</div>

				</div>
			</nav>


			{/* SIDEBAR TOGGLE */}
			<button id="sidebar-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-expanded="false" aria-controls="sidebar"><Icon_Sidebar /></button>

		</>

	);

};