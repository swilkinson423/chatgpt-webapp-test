import React, { useContext, useState, useEffect } from 'react';
import { SharedStateContext } from './_SharedStateComponent';


export default function AppletSettings(){

	const { isDarkMode, setIsDarkMode } = useContext(SharedStateContext);
	
	return (
		
		<>

			{/* Title Element */}
			<h1>Settings</h1>

			{/* Body Element */}
			<h2>Change UI Color</h2>
			<button onClick={() => setIsDarkMode(!isDarkMode)}>{isDarkMode ? 'Turn Dark Mode Off': 'Turn Dark Mode On'}</button>

		</>
	);
};