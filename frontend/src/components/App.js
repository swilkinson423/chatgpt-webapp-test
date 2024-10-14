import React, { useContext } from 'react';
import { SharedStateContext } from './_SharedStateComponent';

import AppletViewAllClient from './views/Applet-Client-ViewAll';
import AppletViewActiveClient from './views/Applet-Client-ViewActive';
import AppletAddNewClient from './views/Applet-Client-AddNew';
import AppletSettings from './views/Applet-Settings';

import Footer from './Footer';

export default function App() {

	const { activeHue } 		= useContext(SharedStateContext);
	const { appletViewState } 	= useContext(SharedStateContext);

	document.body.style.setProperty('--color-primary', activeHue);

	return (
		<>
			<div id="applet" className="App container col">

				
				{appletViewState === "home" &&
					<></>
				}

				{appletViewState === "all-clients" &&
					<>
						<AppletViewAllClient />
					</>
				}

				{appletViewState === "active-clients" &&
					<>
						<AppletViewActiveClient />
					</>
				}


				{appletViewState === "new-client" &&
					<>
						<AppletAddNewClient />
					</>
				}


				{appletViewState === "settings" &&
					<>
						<AppletSettings />
					</>
				}


			</div>
		</>
	);
}