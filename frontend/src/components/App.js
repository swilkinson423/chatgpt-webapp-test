import React, { useContext } from 'react';

import { SharedStateContext } from './_SharedStateComponent.js';

import Box from '@mui/material/Box';

import Sidebar from './Sidebar';

import AppletViewAllClient from './Applet-AllClients';
import AppletViewActiveClient from './Applet-ActiveClient';
import AppletAddNewClient from './Applet-NewClient';
import AppletSettings from './Applet-Settings';

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