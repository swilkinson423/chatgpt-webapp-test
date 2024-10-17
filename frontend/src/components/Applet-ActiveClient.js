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
		<div id="applet" className="">

			{/* Header Element for Section Title & Nav Elements */}
			<div className="view-header">
				<div className="view-header title">{currentClient.name}</div>
				<div className="view-header navbuttons">
					<button className={`navbtn ${openTab === 'about' ? 'active' : ''}`} onClick={() => setOpenTab('about')}>About</button>
					<button className={`navbtn ${openTab === 'personas' ? 'active' : ''}`} onClick={() => setOpenTab('personas')}>Personas</button>
					<button className={`navbtn ${openTab === 'topics' ? 'active' : ''}`} onClick={() => setOpenTab('topics')}>Topics</button>
					<button className={`navbtn ${openTab === 'settings' ? 'active' : ''}`} onClick={() => setOpenTab('settings')}>Settings</button>
				</div>
			</div>

			{/* Body Element for Displaying Section Content */}
			<div className="view-body">
				{renderTabView()}
			</div>

		</div>
	);
};