import React, { useContext, useEffect } from 'react';

import { SharedStateContext } from './_SharedStateComponent';

import { ReactComponent as Settings } from './../assets/sliders.svg';
import { ReactComponent as Icon_Sidebar } from "./../assets/layout-sidebar-inset.svg"
import { ReactComponent as Icon_Sidebar_Vert } from "./../assets/three-dots-vertical.svg"
import { ReactComponent as Caret } from "./../assets/caret-down-fill.svg"
import { ReactComponent as AddClient } from "./../assets/person-fill-add.svg"

export default function Sidebar() {

	const { appletViewState, setAppletViewState, clients, activeClientID, setActiveClientID } = useContext(SharedStateContext);

	//Fetch clients on component mount
	useEffect(() => {
		toggleActiveElements();
    }, [appletViewState, clients, activeClientID]);


	// Toggles the active state of the sidebar elements.
	const toggleActiveElements = () => {
		
		// Remove Active Status from All Elements.
		const activeElements = document.getElementsByClassName("activeSidebar");
		Array.prototype.forEach.call(activeElements, (activeElement) => {
			activeElement.classList.remove("activeSidebar");
		});

		// Set selected element to active.
		try {
			var newActiveElement = document.getElementById(`sidebar-all-clients`);
			if (typeof activeClientID === 'string') {
				newActiveElement = document.getElementById(`sidebar-${appletViewState}`);
			} else {
				newActiveElement = document.getElementById(`sidebar-client-${activeClientID}`);
			};
			newActiveElement.classList.add("activeSidebar");
		} catch (err) {
			console.error('Error setting active element:', err);
		}
	};
	
	function MountNavbar() {
		try {
			const clientList = clients
					.sort((a, b) => { 
						return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
					})
					.map((client) => ( 
						<div 
							id={`sidebar-client-${client.id}`} 
							className={`sidebar-subitem`} 
							key={`client-${client.id}`}
							onClick={() => {setAppletViewState('active-clients'); setActiveClientID(client.id);}}
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

			return clientList;
				
		} catch (err) {
			console.error('Error fetching clients for sidebarbar:', err);
			return <div>Error fetching clients</div>;
		}
	}



	return (
		<>
			{/* SIDEBAR */}
			<nav id="sidebar" className="collapse collapse-horizontal">
				<div id="sidebar-wrapper">


					{/* Sample Sidebar Section */}
					<div id="sidebar-header">
						
						{/* SETTINGS BUTTON */}
						<div id="sidebar-settings" onClick={() => {setAppletViewState("settings"); setActiveClientID("settings");}}><Settings /></div>

						{/* SIDEBAR TOGGLE */}
						<div id="sidebar-toggle-closer" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-expanded="false" aria-controls="sidebar"><Icon_Sidebar /></div>

					</div>


					{/* Display Client List */}
					<div id="sidebar-clients" className="sidebar-section">
						
						<div className="sidebar-item collapsed" data-bs-toggle="collapse" data-bs-target="#client-list" aria-expanded="false" aria-controls="client-list">
							<div className="sidebar-item-name">Clients</div>
							<div id="client-list-toggle" className="sidebar-item-icon sidebar-item-toggle"><Caret /></div>
						</div>
						
						<div id="client-list" className="sidebar-item collapse">

							{/* Button for 'all clients' view */}
							<div id="sidebar-all-clients" className="sidebar-subitem activeSidebar" onClick={() => {setAppletViewState('all-clients'); setActiveClientID("all-clients");}}>
								<div className="sidebar-active-state-wrapper">
									<div className="active-state-icon"><Caret /></div>
								</div>
								<div className="sidebar-item-name">View All Clients</div>
								<div className="sidebar-item-icon"><AddClient /></div>
							</div>
							
							{/* Buttons for individual client views */}
							<div className="sidebar-content">{MountNavbar()}</div>
							
							{/* Button for 'add new client' */}
							<div id="sidebar-new-client" className="sidebar-subitem" onClick={() => {setAppletViewState('new-client'); setActiveClientID("new-client");}}>
								<div className="sidebar-active-state-wrapper">
									<div className="active-state-icon"><Caret /></div>
								</div>
								<div className="sidebar-item-name">New Client</div>
								<div className="sidebar-item-icon"><AddClient /></div>
							</div>
						</div>
					</div>

					{/* Sample Sidebar Section */}
					<div id="sidebar-sample-section" className="sidebar-section">
						
						<div id="sidebar-X" className="sidebar-item" onClick={() => {setAppletViewState("X"); setActiveClientID("X");}}>
							<div className="sidebar-item-name">Sample</div>
						</div>

					</div>
		
					{/* Sample Sidebar Footer */}
					<div id="sidebar-sample-footer" className="sidebar-section">
						<div id="sidebar-Y" className="sidebar-item" onClick={() => {setAppletViewState("Y"); setActiveClientID("Y");}}>
							<div className="sidebar-item-name">Sample Footer</div>
						</div>
					</div>

				</div>
			</nav>

			{/* SIDEBAR TOGGLE */}
			<div id="sidebar-toggle-opener" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-expanded="false" aria-controls="sidebar"><Icon_Sidebar_Vert /></div>

		</>

	);

};