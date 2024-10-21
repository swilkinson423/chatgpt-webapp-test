import React, { useState, useContext } from 'react';

import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';

import Avatar from '@mui/material/Avatar';

import Typography from '@mui/material/Typography';

import MenuIcon from '@mui/icons-material/Menu';

import { SharedStateContext } from './_SharedStateComponent';

import SelectContent from './SidebarExt-SelectContent';
import MenuContent from './SidebarExt-MenuContent';
import CardAlert from './SidebarExt-CardAlert';
import OptionsMenu from './SidebarExt-OptionsMenu';

// Sidebar Values
const expandedWidth = 250;
const collapsedWidth = 70;

const Drawer = styled(MuiDrawer)({
	width: expandedWidth,
	flexShrink: 0,
	boxSizing: 'border-box',
	mt: 10,
	[`& .${drawerClasses.paper}`]: {
		width: expandedWidth,
		boxSizing: 'border-box',
	},
});

export default function Sidebar() {

	const theme = useTheme();

	const { isSidebarCollapsed, setIsSidebarCollapsed, setOpenSubMenu } = useContext(SharedStateContext);

	return (

		<Drawer
			variant="permanent"
			sx={{
				width: isSidebarCollapsed ? collapsedWidth : expandedWidth,
				display: { xs: 'none', md: 'block' },
				[`& .${drawerClasses.paper}`]: {
					backgroundColor: 'background.paper',
					width: isSidebarCollapsed ? collapsedWidth : expandedWidth,
					overflow: 'hidden',
				},
			}}
		>

			{/* Toggle button */}
			<IconButton
				onClick={() => { setIsSidebarCollapsed(!isSidebarCollapsed); setOpenSubMenu('none'); }}
				style={{ marginLeft: isSidebarCollapsed ? 'auto' : 'auto', marginRight: isSidebarCollapsed ? 'auto' : '5px' }}
			>
				{isSidebarCollapsed ? <MenuIcon /> : <MenuIcon />}
			</IconButton>



			<Box
				id="sidebar-logo"
				sx={{
					display: 'flex', // Flexbox to center
					justifyContent: 'center', // Horizontally center the content
					alignItems: 'center', // Vertically center the content
					m: 'auto',
					p: 1,
					height: 'auto', // Adjust the height if needed
					transition: 'width 0.3s ease', // Smooth transition for width change
				}}
			>
				<img
					src={theme.palette.mode === 'dark' ? 'logo-white-noBG.png' : 'logo-black-noBG.png'} // Change based on theme mode
					alt="Logo"
					style={{ width: isSidebarCollapsed ? '50px' : '50px', height: 'auto' }} // Adjust image size based on sidebar state
				/>
				{!isSidebarCollapsed && (
					<Typography
						
						sx={{
							marginLeft: '10px',  // Add space between the image and text
							transition: 'opacity 0.3s ease',  // Smooth appearance
							opacity: isSidebarCollapsed ? 0 : 1,  // Hide when collapsed, show when open
						}}
					>
						Marketing Dashboard
					</Typography>
				)}


			</Box>



			<MenuContent />

			{/* <Box
				sx={{
					display: 'flex',
					mt: 'calc(var(--template-frame-height, 0px) + 4px)',
					p: 1.5,
				}}
			>
				<SelectContent />
			</Box> */}

			{/* <CardAlert /> */}

			{/* <Stack
				direction="row"
				sx={{
					p: 2,
					gap: 1,
					alignItems: 'center',
					borderTop: '1px solid',
					borderColor: 'divider',
				}}
			>
				<Avatar
					sizes="small"
					alt="Riley Carter"
					src="/static/images/avatar/7.jpg"
					sx={{ width: 36, height: 36 }}
				/>

				<Box sx={{ mr: 'auto' }}>
					<Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
						Riley Carter
					</Typography>
					<Typography variant="caption" sx={{ color: 'text.secondary' }}>
						riley@email.com
					</Typography>
				</Box>

				<OptionsMenu />
			</Stack> */}


		</Drawer>

	);
}