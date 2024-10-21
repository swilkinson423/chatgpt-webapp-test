import React, { useContext } from 'react';
import { useTheme } from '@mui/material';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Collapse from '@mui/material/Collapse';

import Popover from '@mui/material/Popover';

import CircleIcon from '@mui/icons-material/Circle';

import { SharedStateContext } from './_SharedStateComponent';

export default function ChildListSidebar({ text, icon, view, children, anchorEl }) {

	const theme = useTheme();

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
					<Collapse
						in={openSubMenu === view}
						timeout="auto"
						unmountOnExit
						sx={{
							backgroundColor: 'background.highlightlight',
							ml: 1,
							overflow: 'hidden',
							textOverflow: 'ellipsis'
						}}
					>
						<List component="div" disablePadding>
							
							{childList.map((child) => (
								<ListItemButton
									key={"listitembutton-" + child.id}
									onClick={() => {
										setActiveSidebarSubitem(''+view+'-'+child.id+'');
										subitemAction(view, child.id);
									}}
									sx={{
										p: 0,
										position: 'relative',
										'&::before': {
											content: '""',
											position: 'absolute',
											top: 0,
											left: '18px',
											width: '1px',
											height: '100%',
											backgroundColor: theme.palette.primary.main,
										},
										'&:last-of-type::before': {
											height: '50%',
										},
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 'auto',  // Remove default padding from ListItemIcon
											position: 'relative',
											ml: '11px', // Adjust to align with the line
										}}
									>
										<CircleIcon
											
											sx={{
												zIndex: 1,
												width: '14px',
												height: '14px',
												color: activeSidebarSubitem === ''+view+'-'+child.id+'' ? theme.palette.secondary.main : theme.palette.primary.main,
											}}
										/>
									</ListItemIcon>

									<ListItemText
										primary={child.name}
										key={"listitemname-" + child.id}
										sx={{
											ml: 1,  // Adjust this value to reduce space between the circle and text
										}}
									/>
								</ListItemButton>
							))}

						</List>

					</Collapse>
				:
					<Popover
						id={"sidebar-popover-" + text}
						anchorEl={anchorEl}
						open={openSubMenu === view}
						onClose={() => setOpenSubMenu('none')}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
						slotProps={{
							paper: {
								sx: {
									p: 1,
									mt: 1,
									ml: -1,
									maxHeight: '500px',  // Set a max-height for the popover
									overflowY: 'auto',   // Allow scrolling if content exceeds max-height
									backgroundColor: 'background.highlightlight'
								}
							}
						}}
					>
						{childList.map((child) => (
							
							<ListItemButton
								key={"listitembutton-" + child.id}
								onClick={() => {
									setActiveSidebarSubitem(''+view+'-'+child.id+'');
									subitemAction(view, child.id);
									setOpenSubMenu('none');
								}}
							>

								<ListItemText
									primary={child.name}
									key={"listitemname-" + child.id}
									sx={{
										ml: 1,  // Adjust this value to reduce space between the circle and text
									}}
								/>
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