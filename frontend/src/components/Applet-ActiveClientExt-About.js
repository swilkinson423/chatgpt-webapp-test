import React, { useState, useEffect, useContext } from 'react';

import axios from 'axios';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


import { SharedStateContext } from './_SharedStateComponent';

import { ReactComponent as LogoLaptop } from "./../assets/links-laptop.svg"
import { ReactComponent as LogoLinkedIn } from "./../assets/links-linkedin.svg"
import { ReactComponent as LogoYouTube } from "./../assets/links-youtube.svg"
import { ReactComponent as LogoTwitter } from "./../assets/links-twitter.svg"
import { ReactComponent as LogoFacebook } from "./../assets/links-facebook.svg"
import { ReactComponent as LogoInstagram } from "./../assets/links-instagram.svg"
import { ReactComponent as LogoTikTok } from "./../assets/links-tiktok.svg"

export default function AppletActiveClientAbout() {

	const { isDarkMode, currentClient } = useContext(SharedStateContext);

	const [competitorImages, setCompetitorImages] = useState({});

	const [expanded, setExpanded] = useState('none'); // State for collapsible pros and cons

	// Handle competitor expanded state
	const handleExpandClick = (competitorUrl) => {
		if (expanded === competitorUrl) {
			setExpanded('none');
		} else {
			setExpanded(competitorUrl);
		}
	  };
	
	// Fetch meta data for each competitor
	const fetchWebsiteMeta = async (targetUrl) => {
		try {
			const response = await axios
				.get('http://localhost:3000/fetch-meta', { params: { url: targetUrl }})
				.catch((error) => console.error("Error fetching metadata: ", error));;
			return response.data;
		} catch (error) {
			return {};
		}
	};

	useEffect(() => {
		if (currentClient.products) {
			const products = JSON.parse(currentClient.products);
			products.forEach((product) => {
				product.competitors.forEach(async (competitor) => {
					const metaData = await fetchWebsiteMeta(competitor.url);
					setCompetitorImages((prevImages) => ({
						...prevImages,
						[competitor.url]: metaData.image
					}));
				});
			});
		}
	}, [currentClient.products]);


	// Social Links
	const socials = [
		{ name: "Website", url: currentClient.website, icon: <LogoLaptop /> },
		{ name: "LinkedIn", url: currentClient.linkedin, icon: <LogoLinkedIn /> },
		{ name: "YouTube", url: currentClient.youtube, icon: <LogoYouTube /> },
		{ name: "Twitter", url: currentClient.twitter, icon: <LogoTwitter /> },
		{ name: "Facebook", url: currentClient.facebook, icon: <LogoFacebook /> },
		{ name: "Instagram", url: currentClient.instagram, icon: <LogoInstagram /> },
		{ name: "TikTok", url: currentClient.tiktok, icon: <LogoTikTok /> },
		{ name: "Pinterest", url: currentClient.pinterest, icon: <LogoTikTok /> }
	]

	return (
		<Stack>

			{/* Overview Header */}
			<Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>

				{/* Header Title */}
				<h1>Company Overview</h1>

				{/* Website & Social Links */}
				<Stack direction="row">
					{socials.map((social, index) => (
						<>
							{social.url &&
								<Button className='client-socials' startIcon={social.icon} size="small" fontSize="small" href={social.url} variant="contained" target="_blank" rel="noopener noreferrer">
									{social.name}
								</Button>
							}
						</>
					))}
				</Stack>

			</Stack>

			<h3>{currentClient.description}</h3>
			<p>{currentClient.descriptionaddon}</p>

			<Divider />


			{/* Target Personas */}
			<h2>Target Personas</h2>
			
			<Stack className="client-container persona" direction="row" spacing={2}>
				
				{currentClient.personas &&
					JSON.parse(currentClient.personas).map((persona, index) => (		
						
						<Card className="client-card persona" key={index} variant="outlined">
							<CardContent key={index} sx={{ flexGrow: 1 }}>
								<h1>{persona.name}</h1>
								<p>{persona.personaSummary}</p>
								<p>{persona.industrySummary}</p>
								<p>{persona.services}</p>
							</CardContent>
						</Card>

					))
				}

			</Stack>
			
			<Divider />

			{/* Products & Services */}
			<h2>Products & Services</h2>
				
			{currentClient.products &&
				JSON.parse(currentClient.products).map((product, index) => (
					
					<Paper className={`client-paper product ${isDarkMode && 'dark'}`} elevation={3}>
						<Stack key={index}>
							<h1 key={"name" + index}>{product.name}</h1>
							<p key={"description" + index}>{product.description}</p>
						</Stack>

						<h4>Competitors:</h4>
						<Box className="client-container product" sx={{ height: '500px', overflowY: 'auto' }}>
							
							{product.competitors &&
								product.competitors.map((competitor) => (

									<Card className="client-card product" key={index} variant="outlined" sx={{ display: 'flex', flexDirection: 'row', marginBottom: '15px' }}>
									
										
										
										{/* Competitor Info */}
										<Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
											
											<Stack direction="row" spascing={2} justifyContent="space-between" alignItems="center">
												{/* Competitor Image */}
												<CardMedia component="img" sx={{ height: '200px', width: '350px', objectFit: 'cover', flexShrink: 0 }} image={competitorImages[competitor.url] || 'fallback-image.png'} onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image.png'; }} />
											
												<Stack sx={{ height: '200px' }}>

													<CardContent sx={{ pt: 0 }}>
														<Stack direction="row" spascing={2} justifyContent="space-between" alignItems="center">
															<h2 sx={{ mr: 'auto' }}>{competitor.name}</h2>
															<Button className='competitor-url' href={competitor.url} size="small" sx={{ ml: 'auto' }} variant="contained" target="_blank" rel="noopener noreferrer">
																Visit Website
															</Button>
														</Stack>
														<hr />
														<h4>{competitor.description}</h4>
													</CardContent>

													<CardActions sx={{ mt: 'auto'}}>
														<Button startIcon={expanded === competitor.url ? <ExpandLessIcon /> : <ExpandMoreIcon />} size="small" fontSize="small" onClick={() => handleExpandClick(competitor.url)} aria-expanded={expanded === competitor.url} aria-label="show more">
															{expanded === competitor.url ? 'Less' : 'More'}
														</Button>
													</CardActions>

												</Stack>

											</Stack>
											
											{/* Collapsible Pros and Cons */}
											<Collapse in={expanded === competitor.url} timeout="auto" unmountOnExit>
												<CardContent>
													<ul>
														<li><strong>Pros:</strong> {competitor.pros}</li>
														<li><strong>Cons:</strong> {competitor.cons}</li>
													</ul>
												</CardContent>
											</Collapse>

										</Box>
										
									</Card>

								))
							}

						</Box>

					</Paper>
				))
			}

		</Stack>

	);
}