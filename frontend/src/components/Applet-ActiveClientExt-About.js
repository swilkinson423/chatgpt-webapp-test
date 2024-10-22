import React, { useState, useEffect, useContext } from 'react';

import axios from 'axios';

import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

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



			{/* Products & Services */}
			<h2>Products & Services</h2>

			{currentClient.products
				?
				JSON.parse(currentClient.products).map((product, index) => (
					<>
						<Paper className={`persona ${isDarkMode && 'dark'}`} elevation={3}>
							<Stack key={index}>
								<h3 key={"name" + index}>{product.name}</h3>
								<p key={"description" + index}>{product.description}</p>
							</Stack>

							<h4>Competitors:</h4>
							<Stack className="competitor-container" direction="row" spacing={2}>

								{product.competitors.map((competitor, index) => (

									<Card className="competitor-card" key={index} variant="outlined">
										
										<CardMedia height="200" image={competitorImages[competitor.url]} component="img" />
										
										<CardContent key={index}>
											<h3>{competitor.name}</h3>
											<a href={competitor.url}><h5>{competitor.url}</h5></a>
											<hr />
											<h4>{competitor.description} </h4>
											<ul>
												<li><h5><strong>Pros -</strong> {competitor.pros}</h5></li>
												<li><h5><strong>Cons -</strong> {competitor.cons}</h5></li>
											</ul>
										</CardContent>
									</Card>

								))}

							</Stack>
						</Paper>
					</>

				))
				:
				<p>No Products & Services Found</p>
			}

		</Stack>

	);
}