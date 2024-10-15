import React, { useContext } from 'react';

import { SharedStateContext } from './_SharedStateComponent';

export default function AppletActiveClientTopics() {

	const { currentClient } = useContext(SharedStateContext);

	return (

		/* --+--+-- VIEW CLIENT TOPICS --+--+-- */
		<div id="tabcontent-topics" className="view-window row tabcontent">

			{/* Section 01 - Topics */}
			<div className='view-body col-12'>
				<div className='row'>

					{/* Topics Header */}
					<div className="col-12">
						<h1>Content Topics</h1>
					</div>

					{/* Section 01 - ?? */}
					<div className="view-wrapper col-md-6 col-12">
						<h2>??</h2>
					</div>

					{/* Section 02 - ?? */}
					<div className="view-wrapper col-md-6 col-12">
						<h2>??</h2>
					</div>

				</div>
			</div>
			
		</div>

	);
}