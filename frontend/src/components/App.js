import React, { useContext } from 'react';
import { SharedStateContext } from './_SharedStateComponent';

import AppletViewAllClient from './views/Applet-Client-ViewAll';
import AppletViewActiveClient from './views/Applet-Client-ViewActive';
import AppletAddNewClient from './views/Applet-Client-AddNew';
import AppletSettings from './views/Applet-Settings';

import Sidebar from './Sidebar';

export default function App() {

	const { activeHue, appletViewState } = useContext(SharedStateContext);

	document.body.style.setProperty('--color-primary', activeHue);

	const renderAppletView = () => {
		switch (appletViewState) {
			case 'all-clients': return <AppletViewAllClient />;
			case 'active-clients': return <AppletViewActiveClient />;
			case 'new-client': return <AppletAddNewClient />;
			case 'settings': return <AppletSettings />;
			default: return null;
		}
	};

	return (

		<div id="applet-window">
			<div className="container-fluid h-100">
				<div className="row h-100">

					<Sidebar />

					<div id="applet" className="App container col">
						{renderAppletView()}
					</div>

				</div>
			</div>
		</div>

	);
}