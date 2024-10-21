import React, { useContext, useEffect } from 'react';

import { SharedStateContext } from './_SharedStateComponent';

import { ReactComponent as Settings } from './../assets/sliders.svg';
import { ReactComponent as Icon_Sidebar } from "./../assets/layout-sidebar-inset.svg"
import { ReactComponent as Icon_Sidebar_Vert } from "./../assets/three-dots-vertical.svg"
import { ReactComponent as Caret } from "./../assets/caret-down-fill.svg"
import { ReactComponent as AddClient } from "./../assets/person-fill-add.svg"

export default function Sidebar2() {

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
							className={`sidebar-item`} 
							key={`client-${client.id}`}
							onClick={() => {setAppletViewState('active-clients'); setActiveClientID(client.id);}}
						>
							
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
			<div id="sidebar" className='sidebar-wrapper col'>
				<div className='sidebar-wrapper container h-100'>
					<div className='sidebar-wrapper row h-100'>

						<nav id="sidebar-static" className="sidebar-wrapper col-12">
							
							{/* Button for 'all clients' view */}
							<div id="sidebar-all-clients" className="sidebar-section" onClick={() => {setAppletViewState('all-clients'); setActiveClientID("all-clients");}}>
								<div className="sidebar-section-icon"><AddClient /></div>
								<div className="sidebar-section-name">View All</div>
							</div>

							{/* Button for 'active clients' view */}
							<div id="sidebar-view-clients" className="sidebar-section" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar-hover" aria-expanded="false" aria-controls="sidebar-hover">
								<div className="sidebar-section-icon"><AddClient /></div>
								<div className="sidebar-section-name">View Clients</div>
							</div>

							{/* Sample Sidebar Section */}
							<div id="sidebar-X" className="sidebar-section" onClick={() => {setAppletViewState("X"); setActiveClientID("X");}}>
								<div className="sidebar-section-icon"><Caret /></div>
								<div className="sidebar-section-name">Sample</div>
							</div>
					
							{/* SETTINGS BUTTON */}
							<div id="sidebar-settings" className="sidebar-section" onClick={() => {setAppletViewState("settings"); setActiveClientID("settings");}}>
								<div className="sidebar-section-icon"><Settings /></div>
								<div className="sidebar-section-name">Settings</div>
							</div>

							{/* Sample Sidebar Footer */}
							<div id="sidebar-sample-footer" className="sidebar-section" onClick={() => {setAppletViewState("sample-footer"); setActiveClientID("sample-footer");}}>
								<div className="sidebar-section-icon"><Caret /></div>
								<div className="sidebar-section-name">Sample Footer</div>
							</div>

						</nav>
						
						{/* Display Client List */}
						<nav id="sidebar-hover" className="collapse-horizontal collapsed">
									
							{/* Buttons for individual client views */}
							<div className="sidebar-content">{MountNavbar()}</div>
							
							{/* Button for 'add new client' */}
							<div id="sidebar-new-client" className="sidebar-subitem" onClick={() => {setAppletViewState('new-client'); setActiveClientID("new-client");}}>
								<div className="sidebar-item-name">New Client</div>
								<div className="sidebar-item-icon"><AddClient /></div>
							</div>

						</nav>

					</div>
				</div>
			</div>

		</>

	);

};