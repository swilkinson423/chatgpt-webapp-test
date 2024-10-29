import React, { useState, useContext, useEffect } from 'react';
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

	const {
		openTab,
		setOpenTab,
		activeClientID,
		currentClientOverview,
		setCurrentClientOverview,
		setCurrentClientSocials,
		setCurrentClientPersonas,
		setCurrentClientProducts,
		setCurrentClientCompetitors,
		setCurrentClientDocs,
	} = useContext(SharedStateContext);

	// Track loading state
	const [loading, setLoading] = useState(true);

	// Fetch client data on load
	useEffect(() => {
		setClient();
		setOpenTab("About");
	}, [activeClientID]);

	// Main function to set client data
	const setClient = async () => {
		setLoading(true);
		try {
			// Fetch client data in parallel
			const [clientOverview, clientSocials, clientPersonas, clientProducts, clientDocs] = await Promise.all([
				axios.get(`http://localhost:3000/companies/${activeClientID}`),
				axios.get(`http://localhost:3000/companies/${activeClientID}/socials`),
				axios.get(`http://localhost:3000/companies/${activeClientID}/personas`),
				axios.get(`http://localhost:3000/companies/${activeClientID}/products`),
				axios.get(`http://localhost:3000/companies/${activeClientID}/documents`),

			]);
			
			// Set individual states for each category
			setCurrentClientOverview(clientOverview.data.data);
			setCurrentClientSocials(clientSocials.data.data);
			setCurrentClientPersonas(clientPersonas.data.data);
			setCurrentClientProducts(clientProducts.data.data);
			
			// Fetch competitors for each product and set state
			const competitorsArray = await fetchCompetitors(clientProducts.data.data);
			setCurrentClientCompetitors(competitorsArray);

			// Categorize documents and set state
			const categorizedDocs = categorizeDocuments(clientDocs.data.data);
			setCurrentClientDocs(categorizedDocs);

		} catch (error) {
			console.error("Error setting client data:", error);
		} finally {
			setLoading(false);  // Set loading to false once fetching is complete
		}
	};

	// Helper function to fetch competitors
	const fetchCompetitors = async (products) => {
		const competitorsArray = [];
		for (const product of products) {
			try {
				const competitorsResponse = await axios.get(`http://localhost:3000/products/${product.product_id}/competitors`);
				for (const competitor of competitorsResponse.data.data) {
					if (!competitor.screenshot || competitor.screenshot === 'https://placehold.jp/1920x1080.png') {
						const screenshot = await fetchCompanyScreenshot(competitor.website);
						await axios.put(`http://localhost:3000/companies/${competitor.id}`, { screenshot });
					}
					competitorsArray.push({ competitor_info: competitor, product_id: product.product_id });
				}
			} catch (error) {
				console.error(`Error fetching competitors for product ${product.product_id}:`, error);
			}
		}
		return competitorsArray;
	};

	// Helper function to fetch company screenshot
	const fetchCompanyScreenshot = async (targetUrl) => {
		try {
			const response = await axios.get(`http://localhost:3000/capture-screenshot`, { params: { url: targetUrl } });
			return response.data.image;
		} catch (error) {
			console.error("Error fetching screenshot metadata: ", error);
			return './fallback-image.png';
		}
	};

	// Helper function to categorize documents
	const categorizeDocuments = (docs) => {
		const categorized = { operationalDocs: [], templates: [], samples: [], others: [] };
		docs.forEach(doc => {
			switch (doc.category) {
				case 'operationalDocs':
					categorized.operationalDocs.push(doc);
					break;
				case 'templates':
					categorized.templates.push(doc);
					break;
				case 'samples':
					categorized.samples.push(doc);
					break;
				default:
					categorized.others.push(doc);
					break;
			}
		});
		return categorized;
	};

	// Main Tab Elements
	const viewTabsMain = [
		{ text: 'About', tab: <AppletActiveClientAbout /> },
		{ text: 'Docs', tab: <AppletActiveClientDocs /> },
		{ text: 'Topics', tab: <AppletActiveClientTopics /> },
	];

	// Secondary Tab Elements
	const viewTabsSecondary = [
		{ text: 'Settings', tab: <AppletActiveClientSettings /> },
	];

	return (
		<>
			{/* Render loading state */}
			{loading ? (
				<div>Loading...</div>
			) : (
				<>
					{/* Header Element */}
					<Stack className='view-header'>
						{/* Title Element */}
						<h1 sx={{ display: 'block' }}>{currentClientOverview?.name}</h1>

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
			)}
		</>
	);
};
