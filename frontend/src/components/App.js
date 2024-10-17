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

		<div id="app-window" className="App">
			<Sidebar />
			{renderAppletView()}
		</div>

	);
}