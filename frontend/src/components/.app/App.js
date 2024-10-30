import React, { useContext } from 'react';

import { SharedStateContext } from '../_utils/_SharedStateComponent.js';

import Box from '@mui/material/Box';

import Sidebar from './../.sidebar/Sidebar.js';

import AppletViewAllClient from './../Applet-AllClients.js';
import AppletViewActiveClient from './../activeclient/Applet-ActiveClient.js';
import AppletAddNewClient from './../Applet-NewClient.js';
import AppletSettings from './../Applet-Settings.js';

export default function App() {

	const { isDarkMode, isSidebarCollapsed, appletViewState } = useContext(SharedStateContext);

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

		<Box id='app' className={`${isDarkMode ? 'dark' : 'light'}`}>
			<Sidebar />
			<Box id='applet' className={`${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
				{renderAppletView()}
			</Box>
			
		</Box>

	);
}