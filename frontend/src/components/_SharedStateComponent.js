import React, { createContext, useState } from 'react';

export const SharedStateContext = createContext();

export function SharedStateProvider({ children }) {

	// --+--+-- General UI States --+--+--
	const [isDarkMode, setIsDarkMode] = useState(true); 						// Determines if theme is set to dark mode or light mode.

	// --+--+-- Sidebar States --+--+--
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); 		// Determines if Sidebar is collapsed or expanded.
	const [openSubMenu, setOpenSubMenu] = useState('none'); 					// Determines which sidebar sub-menu is open.
	const [activeSidebarSubitem, setActiveSidebarSubitem] = useState('none'); 	// Determines which sidebar sub-item is active.

	// --+--+-- Applet States --+--+--
	const [appletViewState, setAppletViewState] = useState("all-clients"); 		// Determines which applet is rendered.
	const [openTab, setOpenTab] = useState("About"); 							// Determines which active client tab is open.

	// --+--+-- Client List and Active Client States --+--+--
	const [clients, setClients] = useState([]); 								// Holds the active client list
	const [activeClientID, setActiveClientID] = useState("none"); 				// Determines which client is rendered.

	// --+--+-- Active Client States --+--+--				
	const [currentClientOverview, setCurrentClientOverview] = useState(null);	// The data for the current active client
	const [currentClientSocials, setCurrentClientSocials] = useState([]);
	const [currentClientPersonas, setCurrentClientPersonas] = useState([]);
	const [currentClientProducts, setCurrentClientProducts] = useState([]);
	const [currentClientCompetitors, setCurrentClientCompetitors] = useState([]);
	const [currentClientDocs, setCurrentClientDocs] = useState([]);

	return (
		<SharedStateContext.Provider value={{
												// UI States
												isDarkMode, setIsDarkMode,
												
												// Sidebar States
												isSidebarCollapsed, setIsSidebarCollapsed,
												openSubMenu, setOpenSubMenu,
												activeSidebarSubitem, setActiveSidebarSubitem,

												// Applet States
												appletViewState, setAppletViewState,
												openTab, setOpenTab,

												// Client List and Active Client ID
												clients, setClients,
												activeClientID, setActiveClientID,

												// Active Client Data
												currentClientOverview, setCurrentClientOverview,
												currentClientSocials, setCurrentClientSocials,
												currentClientPersonas, setCurrentClientPersonas,
												currentClientProducts, setCurrentClientProducts,
												currentClientCompetitors, setCurrentClientCompetitors,
												currentClientDocs, setCurrentClientDocs,
											}}>
			{children}
		</SharedStateContext.Provider>
	);

}
