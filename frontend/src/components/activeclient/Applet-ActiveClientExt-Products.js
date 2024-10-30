import React, { useState, useContext } from 'react';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { SharedStateContext } from './../_SharedStateComponent';


// TODO - Add ability to add products. 
// TODO - Add ability to edit products. 
// TODO - Add ability to delete products.


export default function AppletActiveClientProducts() {

	const { 
		isDarkMode, 
		currentClientProducts, 
	} = useContext(SharedStateContext);

	return (
		
		<Stack sx={{ justifyContent: 'space-between' }} spacing={2} >
			
			{/* Header Section */}
			<Stack direction="row" justifyContent="space-between" alignItems="center">

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
					Products & Services:
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

			{/* Products & Services */}
			{currentClientProducts?.map((product) => (
				<Paper
					className={`client-paper ${isDarkMode && 'dark'}`}
					sx={{
						m: '0 0 16px 0',
						p: '16px 16px 32px 16px',
						boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
					}}
					key={product.product_id}
					elevation={3}
				>
					<Stack>
						<h1>{product.name}</h1>
						<p>{product.description}</p>
					</Stack>
					
				</Paper>
			))}
		</Stack>
	);
}
