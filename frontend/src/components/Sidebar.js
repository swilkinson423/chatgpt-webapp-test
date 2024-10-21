import React, { useState, useContext } from 'react';

import MuiDrawer from '@mui/material/Drawer';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';

import { SharedStateContext } from './_SharedStateComponent';

import MenuContent from './SidebarExt-MenuContent';

export default function Sidebar() {

	const { isDarkMode, isSidebarCollapsed, setIsSidebarCollapsed, setOpenSubMenu } = useContext(SharedStateContext);

	return (

		<MuiDrawer id='sidebar' className={`${isSidebarCollapsed ? 'collapsed' : 'expanded'} ${isDarkMode ? 'dark' : 'light'}`} variant="permanent">

			<Box id="sidebar-content">

				{/* Toggle button */}
				<IconButton	id="sidebar-toggle" onClick={() => { setIsSidebarCollapsed(!isSidebarCollapsed); setOpenSubMenu('none'); }} style={{ marginLeft: isSidebarCollapsed ? 'auto' : 'auto', marginRight: isSidebarCollapsed ? 'auto' : '5px' }}>
					<MenuIcon />
				</IconButton>

				<MenuContent />

			</Box>

		</MuiDrawer>

	);
}