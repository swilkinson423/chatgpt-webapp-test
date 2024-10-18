import React, { useContext } from 'react';

import { SharedStateContext } from './_SharedStateComponent';

export default function AppletActiveClientTopics() {

	const { currentClient } = useContext(SharedStateContext);

	return (

		/* --+--+-- VIEW CLIENT TOPICS --+--+-- */
		<div id="tabcontent-topics" className="view-window vert tabcontent">

			{/* Section 01 - Topics */}
			<div className='view-section'>

				{/* Topics Header */}
				<div className="">
					<h1>Content Topics</h1>
				</div>

				{/* Section 01 - ?? */}
				<div className="view-wrapper">
					<h2>??</h2>
				</div>

				{/* Section 02 - ?? */}
				<div className="view-wrapper">
					<h2>??</h2>
				</div>

			</div>
	

		</div>
	);
}