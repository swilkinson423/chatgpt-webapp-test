import React, { useContext } from 'react';

import { SharedStateContext } from './_SharedStateComponent';

export default function AppletActiveClientPersonas() {

	const { currentClient } = useContext(SharedStateContext);

	const personas = JSON.parse(currentClient.personas);

	if (!personas || personas.length === 0) {
		return <div>No personas available.</div>;
	};

	return (

		/* --+--+-- VIEW CLIENT TARGET PERSONAS --+--+-- */
		<div id="tabcontent-personas" className="view-window row tabcontent">

			{/* Section XX - Persona Map */}
			{personas.map(persona => (
				
				<div className="view-body col-12">
					<div className="row">
					
						{/* Persona Header */}
						<div className="col-12">
							<h1>{persona.name}</h1>
						</div>						
					
						{/* Overview */}
						<div className="view-wrapper col-md-12 col-12">
							<h2>Overview:</h2>
							<p>{persona.personaSummary}</p>
							<p>{persona.industrySummary}</p>
							<p>{persona.services}</p>
						</div>

						{/* Competitors */}
						<div className="view-wrapper col-md-4 col-12">
							<h2>Competitors:</h2>
							<div className="row">
								{persona.competitors.map((competitor, index) => (
									<div key={index} className="col-md-12 col-12">
										<h3>{competitor.name}</h3>
										<h4>{competitor.description} </h4>
										<ul>
											<li><h5><strong>Pros -</strong> {competitor.pros}</h5></li>
											<li><h5><strong>Cons -</strong> {competitor.cons}</h5></li>
										</ul>
									</div>
								))}
							</div>
						</div>

						{/* Content Areas */}
						<div className="view-wrapper col-md-8 col-12">
							<h2>Content Areas:</h2>
							<div className="row">
								{persona.contentAreas.map((area, index) => (
									<div key={index} className="col-md-12 col-12">
										<h3>{area.name}</h3>
										<ul>
											{area.examples.map((example, exIndex) => (
												<li key={exIndex}><h5>"{example}"</h5></li>
											))}
										</ul>
									</div>
								))}
							</div>
						</div>

					</div>
				
				</div>
			))}

		</div>
	);

};