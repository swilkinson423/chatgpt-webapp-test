import React, { useContext } from 'react';
import { SharedStateContext } from './_SharedStateComponent';

import AppletViewAllClient from './Applet-AllClients';
import AppletViewActiveClient from './Applet-ActiveClient';
import AppletAddNewClient from './Applet-NewClient';
import AppletSettings from './Applet-Settings';

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