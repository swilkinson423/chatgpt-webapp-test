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

	const { currentClientOverview, currentClientSocials } = useContext(SharedStateContext);
	
	// Social Links with dynamic assignment
	const socials = [
		{ name: "Website", url: currentClientOverview?.website, icon: <LogoLaptop /> },
		{ name: "LinkedIn", url: currentClientSocials?.linkedin, icon: <LogoLinkedIn /> },
		{ name: "YouTube", url: currentClientSocials?.youtube, icon: <LogoYouTube /> },
		{ name: "Twitter", url: currentClientSocials?.twitter, icon: <LogoTwitter /> },
		{ name: "Facebook", url: currentClientSocials?.facebook, icon: <LogoFacebook /> },
		{ name: "Instagram", url: currentClientSocials?.instagram, icon: <LogoInstagram /> },
		{ name: "TikTok", url: currentClientSocials?.tiktok, icon: <LogoTikTok /> },
		{ name: "Pinterest", url: currentClientSocials?.pinterest, icon: <LogoTikTok /> }
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

			<h3>{currentClientOverview?.description}</h3>
			<p>{currentClientOverview?.descriptionaddon}</p>

		</Stack>
	);
}
