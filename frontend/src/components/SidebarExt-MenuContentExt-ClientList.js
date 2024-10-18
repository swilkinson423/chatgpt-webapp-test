import React, { useContext, useEffect } from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { SharedStateContext } from './_SharedStateComponent';

export default function ClientListSidebar() {

	const { appletViewState, setAppletViewState, clients, activeClientID, setActiveClientID } = useContext(SharedStateContext);

	try {
		const clientList = clients
			.sort((a, b) => {
				return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
			})
			.map((client) => (

				<ListItemButton sx={{ pl: 4 }} selected={activeClientID === client.id} key={"listitembutton-" + client.id} onClick={() => { setAppletViewState('active-clients'); setActiveClientID(client.id); }}>
					
					<ListItemIcon key={"listitemicon-" + client.id}>
						<AccountCircleIcon />
					</ListItemIcon>
					
					<ListItemText primary={client.name} key={"listitemname-" + client.id}/>
				</ListItemButton>

			));

		return (
			<>
				{clientList}

				{/* Add Client */}
				<ListItemButton sx={{ pl: 4 }} selected={appletViewState === 'new-client'} onClick={() => { setAppletViewState('new-client'); setActiveClientID('new-client'); }}>
					<ListItemIcon>
						<PersonAddIcon />
					</ListItemIcon>
					<ListItemText primary='New Client' />
				</ListItemButton>
			</>
		);

	} catch (err) {
		console.error('Error fetching clients for sidebarbar:', err);
		return <div>Error fetching clients</div>;
	}
}