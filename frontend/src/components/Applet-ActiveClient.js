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
		try {
			// Fetch client data in parallel
			const [clientOverview, clientSocials, clientPersonas, clientProducts] = await Promise.all([
				axios.get(`http://localhost:3000/clients/${activeClientID}`),
				axios.get(`http://localhost:3000/clients/${activeClientID}/socials`),
				axios.get(`http://localhost:3000/clients/${activeClientID}/personas`),
				axios.get(`http://localhost:3000/clients/${activeClientID}/products`)
			]);

			// Initialize competitors array
			const competitorsArray = [];

			// Fetch competitors for each product
			for (const product of clientProducts.data.data) {
				try {
					const competitorsResponse = await axios.get(`http://localhost:3000/products/${product.product_id}/competitors`);

					// Process each competitor
					for (const competitor of competitorsResponse.data.data) {
						// If competitor screenshot is missing or placeholder, fetch a new one
						if (!competitor.screenshot || competitor.screenshot === 'https://placehold.jp/1920x1080.png') {
							const screenshot = await fetchCompanyScreenshot(competitor.website);

							// Update the competitor company screenshot
							await axios.put(`http://localhost:3000/companies/${competitor.id}`, { screenshot });
						}
						competitorsArray.push({ competitor_info: competitor, product_id: product.product_id });
					}
				} catch (error) {
					console.error(`Error fetching competitors for product ${product.product_id}:`, error);
				}
			}

			// Set the client information
			const client_info = {
				id: clientOverview.data.data.id,
				name: clientOverview.data.data.name,
				website: clientOverview.data.data.website,
				is_client: clientOverview.data.data.is_client,
				description: clientOverview.data.data.description,
				descriptionaddon: clientOverview.data.data.descriptionaddon,
				socials: clientSocials.data.data,
				personas: clientPersonas.data.data,
				products: clientProducts.data.data,
				competitors: competitorsArray,
			};

			setCurrentClient(client_info);
		} catch (error) {
			console.error("Error setting client data:", error);
		}
	};

	// Fetch metadata and screenshot for each competitor
	const fetchCompanyScreenshot = async (targetUrl) => {
		try {
			const response = await axios.get(`http://localhost:3000/capture-screenshot`, {
				params: { url: targetUrl }
			});
			return response.data.image;
		} catch (error) {
			console.error("Error fetching screenshot metadata: ", error);
			return './fallback-image.png';
		}
	};

	// Main Tab Elements
	const viewTabsMain = [
		{ text: 'About', tab: <AppletActiveClientAbout/> },
		{ text: 'Docs', tab: <AppletActiveClientDocs/> },
		{ text: 'Topics', tab: <AppletActiveClientTopics /> },
	];

	// Secondary Tab Elements
	const viewTabsSecondary = [
		{ text: 'Settings', tab: <AppletActiveClientSettings/> },
	];

	return (
		<>
			{/* Header Element */}
			<Stack className='view-header'>
				{/* Title Element */}
				<h1 sx={{ display: 'block' }}>{currentClient.name}</h1>

				{/* Tabs Element */}
				<Tabs value={openTab}>
					{/* Main Tab Elements */}
					{viewTabsMain.map((item, index) => (
						<Tab key={index} label={item.text} value={item.text} onClick={() => setOpenTab(item.text)} />
					))}

					{/* Space Between Elements */}
					<Tab className='tab-spacer' sx={{ mr: 'auto' }} disabled></Tab>

					{/* Secondary Tab Elements */}
					{viewTabsSecondary.map((item, index) => (
						<Tab key={index} label={item.text} value={item.text} onClick={() => setOpenTab(item.text)} />
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
