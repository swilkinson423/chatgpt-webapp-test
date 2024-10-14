import React, { useContext, useState, useEffect } from 'react';
import { SharedStateContext } from './../_SharedStateComponent';


export default function AppletSettings(){

	const { activeHue, setActiveHue } = useContext(SharedStateContext);


	// const setHue = (hue) => {	
	// 	try {
	// 		setActiveHue(hue);
	// 	} catch (err) {
	// 		console.log("Error setting the active hue from the settings menu", err);
	// 	}
	// };

	return (
		<div id="applet-add-new" className="App container col">

			<h2 className="mb-3">Settings</h2>
			<div>Change UI Color</div>
			<button onClick={() => setActiveHue(activeHue + 50)}>New</button>
			<button onClick={() => setActiveHue(200)}>Reset</button>
					
		</div>
	);
};