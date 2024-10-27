import React, { useContext } from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Popover from '@mui/material/Popover';
import CircleIcon from '@mui/icons-material/Circle';

import { SharedStateContext } from './_SharedStateComponent';

export default function ChildListSidebar({ text, view, children, anchorEl }) {
	const {
		isSidebarCollapsed,
		openSubMenu,
		setOpenSubMenu,
		activeSidebarSubitem,
		setActiveSidebarSubitem,
		setAppletViewState,
		setActiveClientID,
	} = useContext(SharedStateContext);

	// Action for subitem selection
	const handleSubitemClick = (childId) => {
		setActiveSidebarSubitem(`${view}-${childId}`);
		setAppletViewState(view);
		if (view === 'active-clients') setActiveClientID(childId);
		if (isSidebarCollapsed) setOpenSubMenu('none');
	};

	// Sort child items alphabetically by name
	const sortedChildren = [...children].sort((a, b) => a.name.localeCompare(b.name));

	return (
		<>
			{!isSidebarCollapsed ? (
				<Collapse
					className="sidebar-childlist"
					in={openSubMenu === view}
					timeout="auto"
					unmountOnExit
				>
					<List component="div" disablePadding>
						{sortedChildren.map((child) => (
							<ListItemButton
								className="sidebar-childitem"
								key={child.id}
								selected={activeSidebarSubitem === `${view}-${child.id}`}
								onClick={() => handleSubitemClick(child.id)}
							>
								<ListItemIcon>
									<CircleIcon
										className={
											activeSidebarSubitem === `${view}-${child.id}`
												? 'childicon-active'
												: ''
										}
									/>
								</ListItemIcon>
								<ListItemText primary={child.name} />
							</ListItemButton>
						))}
					</List>
				</Collapse>
			) : (
				<Popover
					id={`sidebar-popover-${text}`}
					className="sidebar-childlist"
					open={openSubMenu === view}
					onClose={() => setOpenSubMenu('none')}
					anchorEl={anchorEl}
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					transformOrigin={{ vertical: 'top', horizontal: 'left' }}
				>
					{sortedChildren.map((child) => (
						<ListItemButton
							className="sidebar-childitem"
							key={child.id}
							onClick={() => handleSubitemClick(child.id)}
						>
							<ListItemText primary={child.name} />
						</ListItemButton>
					))}
				</Popover>
			)}
		</>
	);
}
