import React, { useContext, useEffect } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { SharedStateContext } from './_SharedStateComponent';

import AppletActiveClientAbout from './Applet-ActiveClientExt-About';
import AppletActiveClientDocs from './Applet-ActiveClientExt-Docs';
import AppletActiveClientTopics from './Applet-ActiveClientExt-Topics';
import AppletActiveClientSettings from './Applet-ActiveClientExt-Settings';

export default function AppletViewActiveClient() {

	const { openTab, setOpenTab, activeClientID, currentClient, setCurrentClient } = useContext(SharedStateContext);

    useEffect(() => {
		setClient();
		setOpenTab("About");
    }, [activeClientID]);

	const setClient = async () => {
		const response = await axios.get(`http://localhost:3000/clients/${activeClientID}`);
		setCurrentClient(response.data);
	};

	// Main Tab Elements
	const viewTabsMain = [
		{ text: 'About', tab: <AppletActiveClientAbout/>},
		{ text: 'Docs', tab: <AppletActiveClientDocs/>},
		{ text: 'Topics', tab: <AppletActiveClientTopics /> },
	];
	
	// Secondary Tab Elements
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
				<Tabs value={openTab} >
					
					{/* Main Tab Elements */}
					{viewTabsMain.map((item, index) => (
						<Tab key={index} label={item.text} value={item.text} onClick={() => setOpenTab(item.text)}/>
					))}


					{/* Space Between Elements */}
					<Tab className='tab-spacer' sx={{mr: 'auto'}} disabled ></Tab>
					
					
					{/* Secondary Tab Elements */}
					{viewTabsSecondary.map((item, index) => (
						<Tab key={index} label={item.text} value={item.text} onClick={() => setOpenTab(item.text)}/>
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