import React, { useContext, useEffect } from 'react';
import axios from 'axios';

import { SharedStateContext } from './_SharedStateComponent';

import AppletActiveClientAbout from './Applet-ActiveClientExt-About';
import AppletActiveClientPersonas from './Applet-ActiveClientExt-Personas';
import AppletActiveClientTopics from './Applet-ActiveClientExt-Topics';
import AppletActiveClientSettings from './Applet-ActiveClientExt-Settings';

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
		<div id="applet">

			{/* Title Element */}
			<h1>{currentClient.name}</h1>

			{/* Nav Elements */}
			<div className="view-header navbuttons">
				<button className={`navbtn ${openTab === 'about' ? 'active' : ''}`} onClick={() => setOpenTab('about')}>About</button>
				<button className={`navbtn ${openTab === 'personas' ? 'active' : ''}`} onClick={() => setOpenTab('personas')}>Personas</button>
				<button className={`navbtn ${openTab === 'topics' ? 'active' : ''}`} onClick={() => setOpenTab('topics')}>Topics</button>
				<button className={`navbtn ${openTab === 'settings' ? 'active' : ''}`} onClick={() => setOpenTab('settings')}>Settings</button>
			</div>

			{/* Body Element */}
			<div className="view-body">
				{renderTabView()}
			</div>

		</div>
	);
};