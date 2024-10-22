import React, { useContext } from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Collapse from '@mui/material/Collapse';

import Popover from '@mui/material/Popover';

import CircleIcon from '@mui/icons-material/Circle';

import { SharedStateContext } from './_SharedStateComponent';

export default function ChildListSidebar({ text, icon, view, children, anchorEl }) {

	const { isSidebarCollapsed, openSubMenu, setOpenSubMenu, activeSidebarSubitem, setActiveSidebarSubitem, setAppletViewState, activeClientID, setActiveClientID } = useContext(SharedStateContext);

	// Set the action for the subitem
	function subitemAction(childList, id){
		try {
			switch (childList) {
				case 'active-clients':
					setActiveClientID(id);
					setAppletViewState('active-clients');
					break;
				default:
					break;
			}
		} catch (err) {
			console.error('Error setting subitem action:', err);
		}
	};
	
	try {
		const childList = children.sort((a, b) => {return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;});


		return (
			<>

				{!isSidebarCollapsed
				?
					<Collapse className='sidebar-childlist' in={openSubMenu === view} timeout="auto" unmountOnExit >
						<List component="div" disablePadding>
							
							{childList.map((child) => (
								<ListItemButton className='sidebar-childitem' key={"listitembutton-" + child.id} onClick={() => { setActiveSidebarSubitem(''+view+'-'+child.id+''); subitemAction(view, child.id); }} >
									<ListItemIcon>
										<CircleIcon className={ `${activeSidebarSubitem === ''+view+'-'+child.id+'' && 'childicon-active'}`} />
									</ListItemIcon>
									<ListItemText primary={child.name} key={"listitemname-" + child.id} />
								</ListItemButton>
							))}

						</List>

					</Collapse>
				:
					<Popover id={"sidebar-popover-" + text} className='sidebar-childlist' open={openSubMenu === view} onClose={() => setOpenSubMenu('none')} anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
						
						{childList.map((child) => (
							<ListItemButton className='sidebar-childitem' key={"listitembutton-" + child.id} onClick={() => { setActiveSidebarSubitem(''+view+'-'+child.id+''); subitemAction(view, child.id); setOpenSubMenu('none'); }} >
								<ListItemText primary={child.name} key={"listitemname-" + child.id}/>
							</ListItemButton>
						))}

					</Popover>
				}
			</>
		);

	} catch (err) {
		console.error('Error fetching clients for sidebar:', err);
		return <div>Error fetching clients</div>;
	}
}