import React, { useContext, useState, useRef, useEffect } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import { SharedStateContext } from './_SharedStateComponent';

// TODO - Replace the text fields for active client view with these editable fields
// TODO - - Add fucntionality for editing socials
// TODO - - Add fucntionality for editing products
// TODO - - Add fucntionality for editing personas
// TODO - - Add fucntionality for editing competitors

// TODO - Fix the mouseEnter/mouseExit functionality to remove unwanted interaction when moving between multiple fields

// Reusable EditableField component
export default function EditableField({ field, label, value, updateFunction, style }) {

	// Shared States
	const { 
		appletViewState,
		openTab,
		activeClientID,

		isEditing,
		setIsEditing,
		currentElement,
		setCurrentElement,
		currentText,
		setCurrentText
	} = useContext(SharedStateContext);

	const [opacity, setOpacity] = useState(1);
    const leaveTimeoutRef = useRef(null);
    const fadeIntervalRef = useRef(null);

	const handleMouseEnter = () => {
		clearTimeout(leaveTimeoutRef.current);
        clearInterval(fadeIntervalRef.current);
        setOpacity(1);
        setCurrentElement(field);
    };

    const handleMouseLeave = () => {
		
		if (isEditing === field) return;

		let countdownTime = 1000;
		let remainingTime = countdownTime;
		
		fadeIntervalRef.current = setInterval(() => {
            remainingTime -= 50;
            setOpacity(Math.max(remainingTime / countdownTime, 0));
        }, 50);

		leaveTimeoutRef.current = setTimeout(() => {
			setCurrentElement(null); 
			clearInterval(fadeIntervalRef.current);
        }, countdownTime);
    };

	// Fetch client data on load
	useEffect(() => {
		setIsEditing(null);
		setCurrentElement(null);
		setCurrentText(null);
	}, [appletViewState, openTab, activeClientID]);

	return (

		<Box 
			onMouseEnter={handleMouseEnter} 
			onMouseLeave={handleMouseLeave} 
			sx={{ 
				position: 'relative', 
				padding: '10px', 
				margin: '0px -10px 0px -10px !important'
			}}
		>
			
			{/* Edit button */}
			{currentElement === field && isEditing != field && (
				<IconButton
					onClick={() => {
						setIsEditing(field);
						setCurrentText(value);
					}}
					sx={{ 
						opacity: opacity,  
						transition: 'opacity 0.5s ease-out', 
						position: 'absolute', 
						left: '-26px', 
						top: 0 }}
				>
					<EditIcon />
				</IconButton>
				
			)}

			{/* Save button */}
			{currentElement === field && isEditing === field && (
				<IconButton
					onClick={() => {
						updateFunction(field, currentText);
						setIsEditing(null);
					}}
					sx={{ position: 'absolute', left: '-26px', top: 0 }}
				>
					<SaveIcon />
				</IconButton>
			)}


			{isEditing === field 
			? 
				<TextField
					multiline
					fullWidth
					hiddenLabel
					variant="filled"
					size="small"
					sx={style}
					value={currentText}
					onChange={(e) => setCurrentText(e.target.value)}
					
				/>
			: 
				<Typography sx={style}>{value}</Typography>
			}
		</Box>
	);
}
