import React, { useState, useContext } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';

import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { SharedStateContext } from './_SharedStateComponent';

import ClientListSidebar from './SidebarExt-MenuContentExt-ClientList';

const mainListItems = [
	{ text: 'Home', icon: <HomeRoundedIcon />, view: 'all-clients', children: false },
	{ text: 'Clients', icon: <PeopleRoundedIcon />, view: 'active-clients', children: <ClientListSidebar /> },
	{ text: 'Analytics', icon: <AnalyticsRoundedIcon />, view: 'analytics', children: false },
];

const secondaryListItems = [
	{ text: 'Settings', icon: <SettingsRoundedIcon />, view: 'settings' },
];

export default function MenuContent() {

	const { appletViewState, setAppletViewState, setActiveClientID } = useContext(SharedStateContext);

	const [open, setOpen] = useState('none');

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
			
			<List dense>
				{mainListItems.map((item, index) => (
					<ListItem key={index} disablePadding sx={{ display: 'block' }}>
						{!item.children 
						? 
						<>	
							{/* Normal menu item without Children*/}
							<ListItemButton selected={appletViewState === item.view} onClick={() => { setAppletViewState(item.view); setActiveClientID(item.view); }}>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.text} />
							</ListItemButton>
						</>
						:
						<>
							{/* Expandable menu item with Children*/}
							<ListItemButton selected={appletViewState === item.view} onClick={() => {open === item.view ? setOpen('none') : setOpen(item.view) }}>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.text} />
								{open === item.view ? <ExpandLess /> : <ExpandMore />}
							</ListItemButton>
							
							<Collapse in={open === item.view} timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
									
									{item.children}

								</List>
							</Collapse>
						</>
						}
					</ListItem>
				))}
			</List>

			<List dense>
				{secondaryListItems.map((item, index) => (
					<ListItem key={index} disablePadding sx={{ display: 'block' }}>

						<ListItemButton selected={appletViewState === item.view} onClick={() => { setAppletViewState(item.view); setActiveClientID(item.view); }}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItemButton>

					</ListItem>
				))}
			</List>

		</Stack>
	);
}