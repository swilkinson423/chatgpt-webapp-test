import React, { useState, useContext } from 'react';

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

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

import { SharedStateContext } from './_SharedStateComponent';

import ChildListSidebar from './SidebarExt-MenuContentExt-ChildList';

export default function MenuContent() {

	const { isSidebarCollapsed, openSubMenu, setOpenSubMenu, appletViewState, setAppletViewState, clients, setActiveClientID } = useContext(SharedStateContext);

	const mainListItems = [
		{ text: 'Home', icon: <HomeRoundedIcon />, view: 'all-clients', children: false },
		{ text: 'Clients', icon: <PeopleRoundedIcon />, view: 'active-clients', children: clients },
		{ text: 'New Client', icon: <PersonAddIcon />, view: 'new-client', children: false },
		{ text: 'Analytics', icon: <AnalyticsRoundedIcon />, view: 'analytics', children: false },
	];
	
	const secondaryListItems = [
		{ text: 'Settings', icon: <SettingsRoundedIcon />, view: 'settings' },
	];

	const [anchorEl, setAnchorEl] = useState(null);

	const handlePopoverClick = (event, view) => {
		setAnchorEl(event.currentTarget);
		setOpenSubMenu(openSubMenu === view ? 'none' : view);
	};


	return (
		<Stack sx={{ flexGrow: 1, justifyContent: 'space-between' }}>

			<List dense>

				{mainListItems.map((item, index) => (

					<>
						<ListItem key={index} disablePadding sx={{ display: 'block' }}>

							{!item.children
								?
								<>
									{/* Menu items without Children*/}
									<ListItemButton 
										selected={appletViewState === item.view} 
										onClick={() => { setAppletViewState(item.view); setActiveClientID(item.view); setOpenSubMenu('none'); }}
									>
										<ListItemIcon>{item.icon}</ListItemIcon>
										{!isSidebarCollapsed && <ListItemText primary={item.text} />}

									</ListItemButton>
								</>
								:
								<>
									{/* Menu items with Children*/}
									<ListItemButton
										id={'sidebar-icon-' + item.text}
										selected={appletViewState === item.view}
										onClick={(event) => handlePopoverClick(event, item.view)}
										aria-controls={openSubMenu === item.view ? 'sidebar-menu-' + item.text : undefined}
										aria-haspopup="true"
										aria-expanded={openSubMenu === item.view ? 'true' : undefined}
									>
										<ListItemIcon>{item.icon}</ListItemIcon>
										{!isSidebarCollapsed
										?
											<>
											<ListItemText primary={item.text} />
											{openSubMenu === item.view ? <ExpandLess /> : <ExpandMore />}
											</>
										:
										 	<></>
										}
									
									</ListItemButton>

									<ChildListSidebar text={item.text} icon={item.icon} view={item.view} children={item.children} anchorEl={anchorEl} />
								</>
							}

						</ListItem>
					</>

				))}
			</List>


			<List dense>
				{secondaryListItems.map((item, index) => (
					<ListItem key={index} disablePadding sx={{ display: 'block' }}>
						<ListItemButton selected={appletViewState === item.view} onClick={() => { setAppletViewState(item.view); setActiveClientID(item.view); }}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							{!isSidebarCollapsed && <ListItemText primary={item.text} />}
						</ListItemButton>
					</ListItem>
				))}
			</List>

		</Stack>
	);
}