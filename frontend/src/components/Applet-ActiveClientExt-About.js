import React, { useState, useContext } from 'react';

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
	const [expanded, setExpanded] = useState('none');

	// Toggle expanded state for collapsible content
	const handleExpandClick = (competitorUrl) => {
		setExpanded(expanded === competitorUrl ? 'none' : competitorUrl);
	};
	
	// Social Links with dynamic assignment
	const socials = [
		{ name: "Website", url: currentClient.website, icon: <LogoLaptop /> },
		{ name: "LinkedIn", url: currentClient.socials?.linkedin, icon: <LogoLinkedIn /> },
		{ name: "YouTube", url: currentClient.socials?.youtube, icon: <LogoYouTube /> },
		{ name: "Twitter", url: currentClient.socials?.twitter, icon: <LogoTwitter /> },
		{ name: "Facebook", url: currentClient.socials?.facebook, icon: <LogoFacebook /> },
		{ name: "Instagram", url: currentClient.socials?.instagram, icon: <LogoInstagram /> },
		{ name: "TikTok", url: currentClient.socials?.tiktok, icon: <LogoTikTok /> },
		{ name: "Pinterest", url: currentClient.socials?.pinterest, icon: <LogoTikTok /> }
	];

	return (
		<Stack>
			{/* Overview Header */}
			<Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
				<h1>Company Overview</h1>

				{/* Website & Social Links */}
				<Stack direction="row">
					{socials.map((social) => (
						social.url && (
							<Button
								className='client-socials'
								key={social.name}
								startIcon={social.icon}
								size="small"
								fontSize="small"
								href={social.url}
								variant="contained"
								target="_blank"
								rel="noopener noreferrer"
							>
								{social.name}
							</Button>
						)
					))}
				</Stack>
			</Stack>

			<h3>{currentClient.description}</h3>
			<p>{currentClient.descriptionaddon}</p>

			<Divider />

			{/* Target Personas */}
			<h2>Target Personas</h2>
			<Stack className="client-container persona" direction="row" spacing={2}>
				{currentClient.personas?.map((persona) => (			
					<Card className="client-card persona" key={persona.persona_id} variant="outlined">
						<CardContent>
							<h1>{persona.name}</h1>
							<p>{persona.personaSummary || "No summary available"}</p>
							<p>{persona.industrySummary || "No industry information"}</p>
							<p>{persona.services || "No services listed"}</p>
						</CardContent>
					</Card>
				))}
			</Stack>
			
			<Divider />

			{/* Products & Services */}
			<h2>Products & Services</h2>
			{currentClient.products?.map((product) => (
				<Paper
					className={`client-paper product ${isDarkMode && 'dark'}`}
					key={product.product_id}
					elevation={3}
				>
					<Stack>
						<h1>{product.name}</h1>
						<p>{product.description}</p>
					</Stack>

					<h4>Competitors:</h4>
					<Box className="client-container product" sx={{ height: '500px', overflowY: 'auto' }}>
						{currentClient.competitors
							.filter(competitor => competitor.product_id === product.product_id)
							.map(({ competitor_info, product_id }) => {
								const { id, name, url, description, screenshot, pros, cons } = competitor_info;

								return (
									<Card
										className="client-card product"
										key={id}
										variant="outlined"
										sx={{ display: 'flex', flexDirection: 'row', marginBottom: '15px' }}
									>
										{/* Competitor Info */}
										<Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
											<Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
												<CardMedia
													component="img"
													sx={{
														height: '270px',
														width: '480px',
														objectFit: 'fill',
														borderRadius: '5px',
														p: '5px',
														boxShadow: 'inset 0 0 15px #000',
														flexShrink: 0
													}}
													image={screenshot || 'fallback-image.png'}
													onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image.png'; }}
												/>

												<Stack sx={{ height: '200px' }}>
													<CardContent sx={{ pt: 0 }}>
														<Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
															<h2 sx={{ mr: 'auto' }}>{name}</h2>
															<Button
																className='competitor-url'
																href={url}
																size="small"
																sx={{ ml: 'auto' }}
																variant="contained"
																target="_blank"
																rel="noopener noreferrer"
															>
																Visit Website
															</Button>
														</Stack>
														<hr />
														<h4>{description}</h4>
													</CardContent>

													{/* Expandable Pros & Cons */}
													<CardActions sx={{ mt: 'auto' }}>
														<Button
															startIcon={expanded === url ? <ExpandLessIcon /> : <ExpandMoreIcon />}
															size="small"
															fontSize="small"
															onClick={() => handleExpandClick(url)}
															aria-expanded={expanded === url}
															aria-label="show more"
														>
															{expanded === url ? 'Less' : 'More'}
														</Button>
													</CardActions>
												</Stack>
											</Stack>

											<Collapse in={expanded === url} timeout="auto" unmountOnExit>
												<CardContent>
													<ul>
														<li><strong>Pros:</strong> {pros || "No pros listed"}</li>
														<li><strong>Cons:</strong> {cons || "No cons listed"}</li>
													</ul>
												</CardContent>
											</Collapse>
										</Box>
									</Card>
								);
							})
						}
					</Box>
				</Paper>
			))}
		</Stack>
	);
}
