import React, { useContext } from 'react';

import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { SharedStateContext } from '../_utils/_SharedStateComponent';
import MenuContent from './SidebarExt-MenuContent';

export default function Sidebar() {
	
	const { 
		isDarkMode, 
		isSidebarCollapsed, 
		setIsSidebarCollapsed, 
		setOpenSubMenu 
	} = useContext(SharedStateContext);

	// Handle sidebar toggle and reset open submenu
	const handleSidebarToggle = () => {
		setIsSidebarCollapsed(!isSidebarCollapsed);
		setOpenSubMenu('none');
	};

	return (
		<MuiDrawer
			id="sidebar"
			className={`${isSidebarCollapsed ? 'collapsed' : 'expanded'} ${isDarkMode ? 'dark' : 'light'}`}
			variant="permanent"
		>
			<Box id="sidebar-content">
				{/* Toggle button */}
				<IconButton
					id="sidebar-toggle"
					onClick={handleSidebarToggle}
					style={{
						margin: isSidebarCollapsed ? '0 auto' : '5px auto 0 5px',
					}}
					aria-label="Toggle sidebar"
				>
					<MenuIcon />
				</IconButton>

				{/* Menu content */}
				<MenuContent />
			</Box>
		</MuiDrawer>
	);
}
