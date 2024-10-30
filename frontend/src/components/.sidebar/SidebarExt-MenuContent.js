import React, { useContext, useState } from 'react';

import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


import { SharedStateContext } from '../_utils/_SharedStateComponent';
import ChildListSidebar from './SidebarExt-MenuContentExt-ChildList';

export default function MenuContent() {
	
	const {
		isSidebarCollapsed,
		openSubMenu,
		setOpenSubMenu,
		setActiveSidebarSubitem,
		appletViewState,
		setAppletViewState,
		clients,
		setActiveClientID,
	} = useContext(SharedStateContext);

	const mainListItems = [
		{ text: 'Home', icon: <HomeRoundedIcon />, view: 'all-clients', children: false },
		{ text: 'Clients', icon: <PeopleRoundedIcon />, view: 'active-clients', children: clients },
		{ text: 'New Client', icon: <PersonAddIcon />, view: 'new-client', children: false },
		{ text: 'Analytics', icon: <AnalyticsRoundedIcon />, view: 'analytics', children: false },
	];

	const secondaryListItems = [
		{ text: 'Settings', icon: <SettingsRoundedIcon />, view: 'settings' },
	];

	// Toggle submenu
	const handlePopoverClick = (view) => {
		setOpenSubMenu(openSubMenu === view ? 'none' : view);
	};

	return (
		<Stack id="sidebar-menucontent">
			
			{/* Primary Menu Items */}
			<List dense>
				{mainListItems.map((item, index) => (
					<ListItem key={index} disablePadding sx={{ display: 'block' }}>
						{!item.children ? (
							// Menu items without children
							<ListItemButton
								className="sidebar-menuitem"
								selected={appletViewState === item.view}
								onClick={() => {
									setAppletViewState(item.view);
									setActiveClientID(item.view);
									setActiveSidebarSubitem('none');
									setOpenSubMenu('none');
								}}
							>
								<ListItemIcon sx={{ margin: isSidebarCollapsed ? 'auto' : '0 5px' }}>{item.icon}</ListItemIcon>
								{!isSidebarCollapsed && <ListItemText primary={item.text} />}
							</ListItemButton>
						) : (
							// Menu items with children
							<>
								<ListItemButton
									className={`sidebar-menuitem ${openSubMenu === item.view && 'open'}`}
									selected={appletViewState === item.view}
									onClick={() => handlePopoverClick(item.view)}
									aria-controls={openSubMenu === item.view ? `sidebar-menu-${item.text}` : undefined}
									aria-haspopup="true"
									aria-expanded={openSubMenu === item.view ? 'true' : undefined}
								>
									<ListItemIcon sx={{ margin: isSidebarCollapsed ? 'auto' : '0 5px' }}>{item.icon}</ListItemIcon>
									{!isSidebarCollapsed && (
										<>
											<ListItemText primary={item.text} />
											<ListItemIcon>
												{openSubMenu === item.view ? <ExpandLess /> : <ExpandMore />}
											</ListItemIcon>
										</>
									)}
								</ListItemButton>
								<ChildListSidebar text={item.text} icon={item.icon} view={item.view} children={item.children} />
							</>
						)}
					</ListItem>
				))}
			</List>

			{/* Secondary Menu Items */}
			<List dense>
				{secondaryListItems.map((item, index) => (
					<ListItem key={index} disablePadding sx={{ display: 'block' }}>
						<ListItemButton
							className="sidebar-menuitem"
							selected={appletViewState === item.view}
							onClick={() => {
								setAppletViewState(item.view);
								setActiveClientID(item.view);
								setActiveSidebarSubitem('none');
								setOpenSubMenu('none');
							}}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							{!isSidebarCollapsed && <ListItemText primary={item.text} />}
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Stack>
	);
}
