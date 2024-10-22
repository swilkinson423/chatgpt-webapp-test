import React, { useContext, useEffect } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { SharedStateContext } from './_SharedStateComponent';

import AppletActiveClientAbout from './Applet-ActiveClientExt-About';
import AppletActiveClientPersonas from './Applet-ActiveClientExt-Personas';
import AppletActiveClientTopics from './Applet-ActiveClientExt-Topics';
import AppletActiveClientSettings from './Applet-ActiveClientExt-Settings';

export default function AppletViewActiveClient() {

	const { openTab, setOpenTab, activeClientID, currentClient, setCurrentClient } = useContext(SharedStateContext);

    useEffect(() => {
		setClient();
		setOpenTab("About");
		setTabID(0);
    }, [activeClientID]);

	const setClient = async () => {
		const response = await axios.get(`http://localhost:3000/clients/${activeClientID}`);
		setCurrentClient(response.data);
	};

	// Determines which tab is active
	const [tabID, setTabID] = React.useState(0);

	const handleTabChange = (event, newValue) => { // 'newValue' is the index of the tab, provided by Tabs component
		setTabID(newValue);
	}

	const viewTabsMain = [
		{ text: 'About', tab: <AppletActiveClientAbout/>},
		{ text: 'Personas', tab: <AppletActiveClientPersonas/>},
		{ text: 'Topics', tab: <AppletActiveClientTopics /> },
	];
	
	const viewTabsSecondary = [
		{ text: 'Settings', tab: <AppletActiveClientSettings/>},
	];

	return (

		<>

			{/* Header Element */}
			<Stack className='view-header'>
				
				{/* Title Element */}
				<h1 sx={{ display: 'block' }}>{currentClient.name}</h1>
				
				{/* Tabs Element */}
				<Tabs value={tabID} onChange={handleTabChange}>
					
					{/* Main Tab Elements */}
					{viewTabsMain.map((item, index) => (
						<Tab key={index} label={item.text} onClick={() => setOpenTab(item.text)}/>
					))}

					{/* Spacer Element */}
					<Tab className='tab-spacer' sx={{flexGrow: 1}} disabled ></Tab>
					
					{/* Secondary Tab Elements */}
					{viewTabsSecondary.map((item, index) => (
						<Tab key={index} label={item.text} onClick={() => setOpenTab(item.text)}/>
					))}
					
				</Tabs>

			</Stack>

			{/* Body Element */}
			<Box className="view-body">
				
				{viewTabsMain.concat(viewTabsSecondary).map((item, index) => (item.text === openTab &&
					<div key={index}>
						{item.tab}
					</div>
				))}

			</Box>

		</>
	);
};