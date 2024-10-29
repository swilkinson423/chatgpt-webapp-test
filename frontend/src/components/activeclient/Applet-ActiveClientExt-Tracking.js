import React, { useContext } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { SharedStateContext } from './../_SharedStateComponent';

export default function AppletActiveClientTracking() {

	const { isDarkMode, currentClientPersonas } = useContext(SharedStateContext);
	
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
					Performance Dashboard:
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
			<Typography variant='p' sx={{ color: '#ff0000' }}>{"{Pending Development}"}</Typography>	
			
		</Stack>
	);
}
