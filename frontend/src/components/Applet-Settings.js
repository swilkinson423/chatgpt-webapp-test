import React, { useContext, useState, useEffect } from 'react';
import { SharedStateContext } from './_SharedStateComponent';


export default function AppletSettings(){

	const { activeHue, setActiveHue } = useContext(SharedStateContext);

	return (
		/* --+-- ADD NEW CLIENT --+-- */
		<div id="applet" className="App container col">
			<div className="container view-container">

				{/* Header */}
				<h2 className="mb-3">Settings</h2>

				{/* Change UI Color */}
				<div>Change UI Color</div>
				<button onClick={() => setActiveHue(activeHue + 50)}>New</button>
				<button onClick={() => setActiveHue(200)}>Reset</button>
						
			</div>
		</div>
	);
};