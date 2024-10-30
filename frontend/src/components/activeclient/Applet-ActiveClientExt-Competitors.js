import React, { useState, useContext } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { SharedStateContext } from './../_SharedStateComponent';


// TODO - Add ability to add competitors. 
// TODO - Add ability to edit competitors. 
// TODO - Add ability to delete competitors. (When deleting a competitor, it should only DELINK that company from the active company)


export default function AppletActiveClientCompetitors() {

	const { 
		currentClientCompetitors, 
	} = useContext(SharedStateContext);
	
	const [expanded, setExpanded] = useState('none');

	// Toggle expanded state for collapsible content
	const handleExpandClick = (competitorUrl) => {
		setExpanded(expanded === competitorUrl ? 'none' : competitorUrl);
	};
	

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
					Competitors:
				</Typography>

				{/* Button Links */}
				<Stack direction="row" spacing={1} sx={{ maxWidth: '60%'}}>
					
					{/* Social Links */}
					{/* {socials.map((social) => (social.url && (
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
					)))} */}

				</Stack>

			</Stack>

			{/* Body Section */}

			{/* Competitors */}
			<Stack sx={{ overflowY: 'auto' }}>
				{currentClientCompetitors.map((competitor) => (
						
					<Card
						key={competitor.id}
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
									image={competitor.competitor_info.screenshot || 'fallback-image.png'}
									onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image.png'; }}
								/>

								<Stack sx={{ height: '200px' }}>	
									<CardContent sx={{ pt: 0 }}>
										<Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
											<h2 sx={{ mr: 'auto' }}>{competitor.competitor_info.name}</h2>
											<Button
												className='competitor-url'
												href={competitor.competitor_info.url}
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
										<h4>{competitor.competitor_info.description}</h4>
									</CardContent>

									{/* Expandable Pros & Cons */}
									<CardActions sx={{ mt: 'auto' }}>
										<Button
											startIcon={expanded === competitor.competitor_info.url ? <ExpandLessIcon /> : <ExpandMoreIcon />}
											size="small"
											fontSize="small"
											onClick={() => handleExpandClick(competitor.competitor_info.url)}
											aria-expanded={expanded === competitor.competitor_info.url}
											aria-label="show more"
										>
											{expanded === competitor.competitor_info.url ? 'Less' : 'More'}
										</Button>
									</CardActions>
								</Stack>

							</Stack>

							<Collapse in={expanded === competitor.competitor_info.url} timeout="auto" unmountOnExit>
								<CardContent>
									<ul>
										<li><strong>Pros:</strong> {competitor.competitor_info.pros || "No pros listed"}</li>
										<li><strong>Cons:</strong> {competitor.competitor_info.cons || "No cons listed"}</li>
									</ul>
								</CardContent>
							</Collapse>

						</Box>

					</Card>
					
				))}

			</Stack>	
		</Stack>
	);
}
