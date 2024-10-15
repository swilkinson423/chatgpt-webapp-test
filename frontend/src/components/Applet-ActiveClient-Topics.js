import React, { useContext } from 'react';

import { SharedStateContext } from './_SharedStateComponent';

export default function AppletActiveClientTopics() {

	const { currentClient } = useContext(SharedStateContext);

	return (
		<>
			{/* Window for Toppics */}
			<div id="tabcontent-topics" className="view-window row tabcontent">

				{/* Header Section */}
				<div className="view-header col-12">
					<h2>Content Topics</h2>
				</div>

				{/* Section 01 - ?? */}
				<div className="view-wrapper col-md-6 col-12">
					<h3>??</h3>
				</div>

				{/* Section 02 - ?? */}
				<div className="view-wrapper col-md-6 col-12">
					<h3>??</h3>
				</div>

			</div>
		</>
	);
}