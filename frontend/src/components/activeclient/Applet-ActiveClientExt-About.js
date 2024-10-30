import React, { useState, useContext } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import LaptopIcon from '@mui/icons-material/Laptop';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { ReactComponent as LogoTikTok } from "./../../assets/links-tiktok.svg"
import PinterestIcon from '@mui/icons-material/Pinterest';
import RedditIcon from '@mui/icons-material/Reddit';

import EditableField from '../reusable/EditableField';
import { updateClientOverview, updateClientSocials } from '../../utils/databaseFunctions';

import { SharedStateContext } from './../_SharedStateComponent';


// TODO - Recombine the socials into the companies table as an array.
// TODO - Add ability to add socials. 
// TODO - Add ability to edit socials. 
// TODO - Add ability to delete socials.


export default function AppletActiveClientAbout() {

	// Shared States
	const {
		currentClientOverview,
		setCurrentClientOverview,
		currentClientSocials,
		setCurrentClientSocials,
	} = useContext(SharedStateContext);

	// Update the Client Overview
	const handleUpdateOverview = async (field, value) => {
		const updatedOverview = { ...currentClientOverview, [field]: value };
		setCurrentClientOverview(updatedOverview);
		await updateClientOverview(currentClientOverview.id, updatedOverview);
	};

	// Update the Client Socials
	const handleUpdateSocials = async (field, value) => {
		setCurrentClientSocials(prev => ({ ...prev, [field]: value }));
		await updateClientSocials(currentClientOverview.id, currentClientSocials);
	};

	// Social Links with dynamic assignment
	const socials = [
		{ name: "Website", url: currentClientOverview?.website, icon: <LaptopIcon /> },
		{ name: "LinkedIn", url: currentClientSocials?.linkedin, icon: <LinkedInIcon /> },
		{ name: "YouTube", url: currentClientSocials?.youtube, icon: <YouTubeIcon /> },
		{ name: "Twitter", url: currentClientSocials?.twitter, icon: <XIcon /> },
		{ name: "Facebook", url: currentClientSocials?.facebook, icon: <FacebookIcon /> },
		{ name: "Instagram", url: currentClientSocials?.instagram, icon: <InstagramIcon /> },
		{ name: "TikTok", url: currentClientSocials?.tiktok, icon: <LogoTikTok /> },
		{ name: "Pinterest", url: currentClientSocials?.pinterest, icon: <PinterestIcon /> },
		{ name: "Reddit", url: currentClientSocials?.reddit, icon: <RedditIcon /> }
	];

	return (

		<Stack sx={{ justifyContent: 'space-between' }} spacing={2} >

			{/* Header Section */}
			<Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
				
				{/* Title */}
				<Typography 
					variant='h4' 
					sx={{ 
						maxWidth: '40%', 
						overflow: 'hidden', 
						whiteSpace: 'nowrap', 
						textOverflow: 'ellipsis' 
					}}
				>
					Company Overview:
				</Typography>

				{/* Button Links */}
				<Stack direction="row" spacing={1} sx={{ maxWidth: '60%'}}>
					
					{/* Social Links */}
					{socials.map((social) => (social.url && (
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
					)))}

				</Stack>

			</Stack>

			{/* Editable Description */}
			<EditableField
				field="description"
				label="Description"
				value={currentClientOverview?.description || ''}
				updateFunction={handleUpdateOverview}
			/>

			<EditableField
				field="descriptionaddon"
				label="Extended Description"
				value={currentClientOverview?.descriptionaddon || ''}
				updateFunction={handleUpdateOverview}
			/>
		</Stack>
	);
}

