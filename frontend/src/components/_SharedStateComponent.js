import React, { createContext, useState } from 'react';

export const SharedStateContext = createContext();

export function SharedStateProvider({ children }) {

	// Used to define dark mode or light mode.
	const [isDarkMode, setIsDarkMode] = useState(true);

	// Determines which applet is rendered.
	const [appletViewState, setAppletViewState] = useState("all-clients");

	// Determines which active client tab is open.
	const [openTab, setOpenTab] = useState("about");

	// Holds the active client list
	const [clients, setClients] = useState([]);

	// Determines which client is rendered.
	const [activeClientID, setActiveClientID] = useState("none");

	// The current client object
	const [currentClient, setCurrentClient] = useState("none");

	return (
		<SharedStateContext.Provider value={{
												isDarkMode, setIsDarkMode,
												appletViewState, setAppletViewState,
												openTab, setOpenTab,
												clients, setClients,
												activeClientID, setActiveClientID,
												currentClient, setCurrentClient
											}}>
			{children}
		</SharedStateContext.Provider>
	);

}
