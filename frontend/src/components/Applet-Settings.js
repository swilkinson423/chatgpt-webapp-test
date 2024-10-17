import React, { useContext, useState, useEffect } from 'react';
import { SharedStateContext } from './_SharedStateComponent';


export default function AppletSettings(){

	const { activeHue, setActiveHue } = useContext(SharedStateContext);

	const renderTabView = () => {

		return (
			
			/* User Settings */
			<div id="tabcontent-usersettings" className="view-window vert tabcontent">

				{/* Section 01 - Settings */}
				<div className='view-section'>
					<div className=''>

						{/* General Settings */}
						<div className="">
							<h1>General</h1>
						</div>	

						{/* Change UI Color */}
						<div id="UIcolor-wrapper" className="view-wrapper">
							<h2>Change UI Color</h2>
							<button onClick={() => setActiveHue(activeHue + 50)}>New</button>
							<button onClick={() => setActiveHue(200)}>Reset</button>
						</div>

					</div>
				</div>					
						
			</div>

		)
	};
	
	return (
		/* --+-- ADD NEW CLIENT --+-- */
		<div id="applet" className="">

			{/* Header Element for Section Title & Nav Elements */}
			<div className="view-header">
				<div className="view-header title">Settings</div>
			</div>

			{/* Body Element for Displaying Section Content */}
			<div className="view-body">
				{renderTabView()}
			</div>

		</div>
	);
};