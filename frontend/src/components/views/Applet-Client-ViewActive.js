import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { SharedStateContext } from './../_SharedStateComponent';

import { ReactComponent as LogoGlobe } from "./../../assets/links-globe.svg"
import { ReactComponent as LogoLaptop } from "./../../assets/links-laptop.svg"
import { ReactComponent as LogoLinkedIn } from "./../../assets/links-linkedin.svg"
import { ReactComponent as LogoYouTube } from "./../../assets/links-youtube.svg"
import { ReactComponent as LogoTwitter } from "./../../assets/links-twitter.svg"
import { ReactComponent as LogoFacebook } from "./../../assets/links-facebook.svg"
import { ReactComponent as LogoInstagram } from "./../../assets/links-instagram.svg"
import { ReactComponent as LogoTikTok } from "./../../assets/links-tiktok.svg"

export default function AppletViewActiveClient() {

	const { setAppletViewState, clients, setClients, activeClientID, setActiveClientID } = useContext(SharedStateContext);

	const [currentClient, setCurrentClient] = useState(null);
	const [error, setError] = useState(null);

    useEffect(() => {
		axios.get(`http://localhost:3000/clients/${activeClientID}`)
            .then(response => setCurrentClient(response.data))
            .catch(err => console.error(err));
		openTab("about");
    }, [activeClientID]);

	//------------------------------------------------------------------------------------
	//-- TODO: Update this so that the edit only updates an individual field -------------
	//------------------------------------------------------------------------------------

	const [isEditing, setIsEditing] = useState(false);

	// Handle form input for editing clients
	const handleEditChange = (e) => {
		const { name, value } = e.target;
		setCurrentClient((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Update a client
	const updateClient = async () => {
		try {
			await axios.put(`http://localhost:3000/clients/${currentClient.id}`, currentClient)
			setClients(clients.map((client) => (client.id === currentClient.id ? currentClient : client)));
			setActiveClientID(currentClient.id);
			setAppletViewState("active-clients");
			openTab('about');
		} catch (err) {
			console.error('Error updating client:', err);
			alert('Failed to update client. Please try again.');
		}
	};

	// Delete a client
	const deleteClient = async (id) => {
		try {
			await axios.delete(`http://localhost:3000/clients/${id}`);
			setClients(clients.filter((client) => client.id !== id));
			setActiveClientID("all-clients");
			setAppletViewState("all-clients");
		} catch (err) {
			console.error('Error deleting client:', err);
			alert('Failed to delete client. Please try again.');
		}
	};

	var clientEdits = <></>;

	if (isEditing === true) {
		clientEdits =  
		<>

			{/* Header */}
			<h4 className="mb-3">Edit Client</h4>

			{/* Client Name */}
			<h6>Name:</h6>
			<input
				type="text"
				name="name"
				placeholder="Client Name"
				className="form-control mb-3"
				value={currentClient.name}
				onChange={handleEditChange}
			/>

			{/* Client Description */}
			<h6>Description:</h6>
			<textarea
				name="description"
				placeholder="Client Description"
				className="form-control mb-3"
				value={currentClient.description}
				onChange={handleEditChange}
			/>

			{/* Client Description Add-on */}
			<h6>Description &#40;Extended&#41;:</h6>
			<textarea
				name="descriptionaddon"
				placeholder="Additional Client Information"
				className="form-control mb-3"
				value={currentClient.descriptionaddon}
				onChange={handleEditChange}
			/>

			{/* Client Website */}
			<h6>Website:</h6>
			<input
				type="text"
				name="website"
				placeholder="Client Website"
				className="form-control mb-3"
				value={currentClient.website}
				onChange={handleEditChange}
			/>

			{/* Client LinkedIn */}
			<h6>LinkedIn:</h6>
			<input
				type="text"
				name="linkedin"
				placeholder="Client LinkedIn"
				className="form-control mb-3"
				value={currentClient.linkedin}
				onChange={handleEditChange}
			/>

			{/* Client YouTube */}
			<h6>YouTube:</h6>
			<input
				type="text"
				name="youtube"
				placeholder="Client YouTube"
				className="form-control mb-3"
				value={currentClient.youtube}
				onChange={handleEditChange}
			/>

			{/* Client Twitter */}
			<h6>X &#40;Twitter&#41;:</h6>
			<input
				type="text"
				name="twitter"
				placeholder="Client X (Twitter)"
				className="form-control mb-3"
				value={currentClient.twitter}
				onChange={handleEditChange}
			/>

			{/* Client Facebook */}
			<h6>Facebook:</h6>
			<input
				type="text"
				name="facebook"
				placeholder="Client Facebook"
				className="form-control mb-3"
				value={currentClient.facebook}
				onChange={handleEditChange}
			/>

			{/* Client Instagram */}
			<h6>Instagram:</h6>
			<input
				type="text"
				name="instagram"
				placeholder="Client Instagram"
				className="form-control mb-3"
				value={currentClient.instagram}
				onChange={handleEditChange}
			/>

			{/* Client TikTok */}
			<h6>TikTok:</h6>
			<input
				type="text"
				name="tiktok"
				placeholder="Client TikTok"
				className="form-control mb-3"
				value={currentClient.tiktok}
				onChange={handleEditChange}
			/>

			{/* Client Products & Services */}
			<h6>Products & Services:</h6>
			<input
				type="text"
				name="products"
				placeholder="Client Products & Services"
				className="form-control mb-3"
				value={currentClient.products}
				onChange={handleEditChange}
			/>

			{/* Client Target Personas */}
			<h6>Target Personas:</h6>
			<textarea
				name="personas"
				placeholder="Client Target Persona"
				className="form-control mb-3"
				value={currentClient.personas}
				onChange={handleEditChange}
			/>

			{/* Submit Button */}
			<button className="btn btn-success" onClick={updateClient}>Update Client</button>

		</>
	} else {
		<></>
	};

	//------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------

	// Updates the active tabs and the sub-views
	function openTab(tabName) {
		try {
			var i, tabbuttons, tabcontents, tabButtonAdd, tabContentAdd;

			setIsEditing(false);

			// Get all current 'active' tab elements elements.
			tabbuttons = document.querySelectorAll(".tabbutton.active");
			tabcontents = document.querySelectorAll(".tabcontent.active");

			// Get all tab elements elements to make 'active' 
			tabButtonAdd = document.getElementById(`tabbutton-${tabName}`);
			tabContentAdd = document.getElementById(`tabcontent-${tabName}`);

			// Remove "active" class from all other tab elements			
			tabbuttons[0].classList.remove("active");
			tabcontents[0].classList.remove("active");

			// Add "active" class to desired tab elements
			tabContentAdd.classList.add("active");
			tabButtonAdd.classList.add("active");
			
		} catch (err) {
			return;
		};
	};

	if (!currentClient) return <div>Loading...</div>;

	if (error) return <div>{error}</div>;

	return (

		/* --+--+-- VIEW ACTIVE CLIENT --+--+-- */
		<div id="applet-view-active" className="applet-view">

			{/* Mini Nav Bar */}
			<div className="container view-container">

				{/* Tabs for navigating client sub-views */}
				<div className="row view-tabs">

					<div className="tabs-title"><h1>{currentClient.name}</h1></div>

					<div className="tabs-buttons">
						<button id="tabbutton-about" className="tabbutton active" onClick={() => openTab('about')}>About</button>
						<button id="tabbutton-personas" className="tabbutton" onClick={() => openTab('personas')}>Target Personas</button>
						<button id="tabbutton-topics" className="tabbutton" onClick={() => openTab('topics')}>Topics</button>
						<button id="tabbutton-settings" className="tabbutton" onClick={() => openTab('settings')}>Settings</button>
					</div>

				</div>
				
				
				{/* Windowlet for client info */}
				<div id="tabcontent-about" className="view-window row tabcontent active">

					{/* Header Section */}
					<div className="view-header col-12">
						<h2>Client Overview</h2>
					</div>

					{/* Section 01 - Description */}
					<div id="description-wrapper" className="view-wrapper col-md-9 col-12">
						<h3>Description</h3>
						<p>{currentClient.description}</p>
						<p>{currentClient.descriptionaddon}</p>
					</div>

					{/* Section 02 - Website & Social Links */}
					<div id="link-group-wrapper" className="view-wrapper col-md-3 col-12">
						<h3>Links</h3>
						<div className="container">
							<div className="row">
								
								{/* Website Link */}
								{currentClient.website &&
									<div className="col col-md-12 col-6">
										<a className="link-group-item" href={currentClient.website} target="_blank" rel="noopener noreferrer">
											<div className="link-group-icon"><LogoLaptop /></div>
											<div className="link-group-name">Website</div>
										</a>
									</div>
								}

								{/* LinkedIn Link */}
								{currentClient.linkedin &&
									<div className="col col-md-12 col-6">
										<a className="link-group-item" href={currentClient.linkedin} target="_blank" rel="noopener noreferrer">
											<div className="link-group-icon"><LogoLinkedIn /></div>
											<div className="link-group-name">LinkedIn</div>
										</a>
									</div>
								}

								{/* YouTube Link */}
								{currentClient.youtube &&
									<div className="col col-md-12 col-6">
										<a className="link-group-item" href={currentClient.youtube} target="_blank" rel="noopener noreferrer">
											<div className="link-group-icon"><LogoYouTube /></div>
											<div className="link-group-name">YouTube</div>
										</a>
									</div>
								}

								{/* Twitter Link */}
								{currentClient.twitter &&
									<div className="col col-md-12 col-6">
										<a className="link-group-item" href={currentClient.twitter} target="_blank" rel="noopener noreferrer">
											<div className="link-group-icon"><LogoTwitter /></div>
											<div className="link-group-name">Twitter</div>
										</a>
									</div>
								}


							</div>
						</div>
					</div>

					{/* Section 03 - Products & Services */}
					<div id="product-group-wrapper" className="view-wrapper col-md-12 col-12">
						<h3>Products & Services</h3>
						<div className="container">
							<div className="row">
								
								{currentClient.products != ''
									?
									// console.log(currentClient.products)
									JSON.parse(currentClient.products).map((product, index) => (
										<div className="col col-md-4 col-12" key={index}>
											<div className='product-group-item'>
												<h4>{product.name}</h4>
												<p>{product.description}</p>
											</div>
										</div>
									))
									:
									<div className='product-group-item'>
										No Products & Services Found
									</div>
								}

							</div>
						</div>
					</div>

				</div>
				


				{/* Window for Target Personas */}
				<div id="tabcontent-personas" className="view-window row tabcontent">

					{/* Header Section */}
					<div className="view-header col-12">
						<h2>Target Personas Overview</h2>
					</div>

					{/* Section 01 - Target Personas */}
					<div className="view-wrapper col-md-6 col-12">
						<h3>Persona #1</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac bibendum tellus, sit amet sodales tortor.</p>
					</div>

					{/* Section 02 */}
					<div className="view-wrapper col-md-6 col-12">
						<h3>??</h3>
						<></>
					</div>

				</div>


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


				{/* Window for Settings */}
				<div id="tabcontent-settings" className="view-window row tabcontent">

					{/* Header Section */}
					<div className="view-header col-12">
						<h2>Client Settings</h2>
					</div>

					{/* Section 01 - Update Client Info */}
					<div className="view-wrapper col-md-6 col-12">
						<h3>Update Client Info</h3>
						{clientEdits}
						<button className="btn btn-danger" onClick={() => deleteClient(currentClient.id)}>Delete</button>
						<button className="btn" onClick={() => console.log("Delete Button Has Been Deactivated")}>Delete</button>
						<button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Client</button>
					</div>

					{/* Section 02 - ?? */}
					<div className="view-wrapper col-md-6 col-12">
						<h3>??</h3>
					</div>

				</div>




			</div>
		</div>
	);
};