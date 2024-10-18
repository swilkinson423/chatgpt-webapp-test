import React, { useContext } from 'react';

import { SharedStateContext } from './_SharedStateComponent.js';

import { ThemeProvider, CssBaseline } from '@mui/material';
import MyTheme from './../styles/theme.js';

import Box from '@mui/material/Box';

import Sidebar from './Sidebar';

import AppletViewAllClient from './Applet-AllClients';
import AppletViewActiveClient from './Applet-ActiveClient';
import AppletAddNewClient from './Applet-NewClient';
import AppletSettings from './Applet-Settings';

export default function App() {

	const { appletViewState } = useContext(SharedStateContext);

	const theme = MyTheme();

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
		
		<ThemeProvider theme={theme}>
			<CssBaseline />

				<Box sx={{ display: 'flex' }}>
					<Sidebar />
					{renderAppletView()}
				</Box>

		</ThemeProvider>
		
	);
}