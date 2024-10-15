import React, { useContext, useEffect } from 'react';
import axios from 'axios';

import { SharedStateContext } from './_SharedStateComponent';

import AppletActiveClientAbout from './Applet-ActiveClient-About';
import AppletActiveClientPersonas from './Applet-ActiveClient-Personas';
import AppletActiveClientTopics from './Applet-ActiveClient-Topics';
import AppletActiveClientSettings from './Applet-ActiveClient-Settings';

export default function AppletViewActiveClient() {

	const { openTab, setOpenTab, activeClientID, currentClient, setCurrentClient } = useContext(SharedStateContext);

    useEffect(() => {
		setClient();
		setOpenTab("about");
    }, [activeClientID]);

	const setClient = async () => {
		const response = await axios.get(`http://localhost:3000/clients/${activeClientID}`);
		setCurrentClient(response.data);
	};

	const renderTabView = () => {

		switch (openTab) {
			case 'about': return <AppletActiveClientAbout />;
			case 'personas': return <AppletActiveClientPersonas />;
			case 'topics': return <AppletActiveClientTopics />;
			case 'settings': return <AppletActiveClientSettings />;
			default: return null;
		}
	};

	return (

		/* --+--+-- VIEW ACTIVE CLIENT --+--+-- */
		<div id="applet" className="App container col">
			<div className="container view-container">

				{/* Tabs for navigating client sub-views */}
				<div className="row view-tabs">
					<div className="tabs-title"><h1>{currentClient.name}</h1></div>
					<div className="tabs-buttons">
						<button id="tabbutton-about" className={`tabbutton ${openTab === 'about' ? 'active' : ''}`} onClick={() => setOpenTab('about')}>About</button>
						<button id="tabbutton-personas" className={`tabbutton ${openTab === 'personas' ? 'active' : ''}`} onClick={() => setOpenTab('personas')}>Target Personas</button>
						<button id="tabbutton-topics" className={`tabbutton ${openTab === 'topics' ? 'active' : ''}`} onClick={() => setOpenTab('topics')}>Topics</button>
						<button id="tabbutton-settings" className={`tabbutton ${openTab === 'settings' ? 'active' : ''}`} onClick={() => setOpenTab('settings')}>Settings</button>
					</div>
				</div>

				{/* Tab content */}
				{renderTabView()}

			</div>
		</div>
	);
};