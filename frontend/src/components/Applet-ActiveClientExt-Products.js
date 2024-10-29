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

import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { SharedStateContext } from './_SharedStateComponent';

export default function AppletActiveClientProducts() {

	const { 
		isDarkMode, 
		currentClientProducts, 
	} = useContext(SharedStateContext);

	return (
		<Stack>
			{/* Overview Header */}
			<Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
				<h1>Products & Services Overview</h1>
			</Stack>

			<Divider />

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
