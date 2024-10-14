import React, { createContext, useState } from 'react';

export const SharedStateContext = createContext();

export function SharedStateProvider({ children }) {

	// Used to set the UI colors.
	const [activeHue, setActiveHue] = useState(200);
	
	// Determines which applet is rendered.
	const [appletViewState, setAppletViewState] = useState("all-clients");

	// Holds the active client list
	const [clients, setClients] = useState([]);

	// Determines which client is rendered.
	const [activeClientID, setActiveClientID] = useState(0);

	return (
		<SharedStateContext.Provider value=	{{ 
												activeHue,			setActiveHue,									
												appletViewState, 	setAppletViewState, 
												clients,			setClients,
												activeClientID, 	setActiveClientID,
											}}>
			{children}
		</SharedStateContext.Provider>
	);

}
