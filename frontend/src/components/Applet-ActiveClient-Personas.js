import React, { useContext } from 'react';

import { SharedStateContext } from './_SharedStateComponent';

export default function AppletActiveClientPersonas() {

	const { currentClient } = useContext(SharedStateContext);

	return (
		<>
			{/* Window for Target Personas */}
			<div id="tabcontent-personas" className="view-window row tabcontent">

				{/* Header Section */}
				<div className="view-header col-12">
					<h2>Target Personas Overview</h2>
				</div>

				{/* Section 01 - Target Personas */}
				<div className="view-wrapper col-md-6 col-12">
					<h3>{currentClient.name}</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac bibendum tellus, sit amet sodales tortor.</p>
				</div>

				{/* Section 02 */}
				<div className="view-wrapper col-md-6 col-12">
					<h3>??</h3>
					<></>
				</div>

			</div>	
		</>
	);
}