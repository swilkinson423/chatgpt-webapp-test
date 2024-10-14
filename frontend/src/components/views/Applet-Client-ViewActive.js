import React, { useContext, useState } from 'react';
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

	const { setAppletViewState } = useContext(SharedStateContext);
	const { clients, setClients } = useContext(SharedStateContext);
	const { activeClientID } = useContext(SharedStateContext);

	var activeClient = {
		name: '', 
		website: '',
		description: '', 
		descriptionaddon: '',
		products: '',
		personas: '',
		linkedin: '',
		youtube: '',
		twitter: '',
		facebook: '',
		instagram: '',
		tiktok: ''
	};

	if (activeClientID != 0){
		activeClient = clients.filter(obj => {return obj.id === activeClientID;})[0] // the [0] is so it returns the object inside the returned array
	};
	//------------------------------------------------------------------------------------
	//-- TODO: Update this so that the edit only updates an individual field -------------
	//------------------------------------------------------------------------------------

	const [isEditing, setIsEditing] = useState(false);
	const [currentClient, setCurrentClient] = useState(null);

	// Update a client
	const updateClient = async () => {
		try {
			const response = await axios.put(`http://localhost:3000/clients/${currentClient.id}`, currentClient);
			setClients(clients.map((client) => (client.id === currentClient.id ? response.data : client)));
			setAppletViewState("home");
			setIsEditing(false);
			setCurrentClient(null);
		} catch (err) {
			console.error('Error updating client:', err);
		}
	};

	// Set current client for editing
	const handleEdit = (client) => {
		setCurrentClient(client);
		setIsEditing(true);
	};

	// Handle form input for editing clients
	const handleEditChange = (e) => {
		const { name, value } = e.target;
		setCurrentClient((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Delete a client
	const deleteClient = async (id) => {
		try {
			await axios.delete(`http://localhost:3000/clients/${id}`);
			setClients(clients.filter((client) => client.id !== id));
		} catch (err) {
			console.error('Error deleting client:', err);
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
	function openTab(evt, tabName) {

		var i, tablinks, tabcontent;

		// Get all elements with class="tabcontent" and hide them
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
			tabcontent[i].className = tabcontent[i].className.replace(" tabDefault", "");
		}

		// Get all elements with class="tablinks" and remove the class "active"
		tablinks = document.getElementsByClassName("tablink");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}

		// Show the current tab, and add an "active" class to the button that opened the tab
		document.getElementById(tabName).style.display = "flex";
		evt.currentTarget.className += " active";

		setIsEditing(false);
	}


	return (

		/* --+--+-- VIEW ACTIVE CLIENT --+--+-- */
		<div id="applet-view-active" className="applet-view">

			{/* Mini Nav Bar */}
			<div className="container view-container">

				{/* Tabs for navigating client sub-views */}
				<div className="row view-tabs">

					<div className="tabs-title"><h1>{activeClient.name}</h1></div>

					<div className="tabs-links">
						<button className="tablink active" onClick={(event) => openTab(event, 'about')}>About</button>
						<button className="tablink" onClick={(event) => openTab(event, 'personas')}>Target Personas</button>
						<button className="tablink" onClick={(event) => openTab(event, 'topics')}>Topics</button>
						<button className="tablink" onClick={(event) => openTab(event, 'settings')}>Settings</button>
					</div>

				</div>
				
				
				{/* Windowlet for client info */}
				<div id="about" className="view-window row tabcontent tabDefault">

					{/* Header Section */}
					<div className="view-header col-12">
						<h2>Client Overview</h2>
					</div>

					{/* Section 01 - Description */}
					<div id="description-wrapper" className="view-wrapper col-md-9 col-12">
						<h3>Description</h3>
						<p>{activeClient.description}</p>
						<p>{activeClient.descriptionaddon}</p>
					</div>

					{/* Section 02 - Website & Social Links */}
					<div id="link-group-wrapper" className="view-wrapper col-md-3 col-12">
						<h3>Links</h3>
						<div className="container">
							<div className="row">
								
								{/* Website Link */}
								{activeClient.website &&
									<div className="col col-md-12 col-6">
										<a className="link-group-item" href={activeClient.website} target="_blank" rel="noopener noreferrer">
											<div className="link-group-icon"><LogoLaptop /></div>
											<div className="link-group-name">Website</div>
										</a>
									</div>
								}

								{/* LinkedIn Link */}
								{activeClient.linkedin &&
									<div className="col col-md-12 col-6">
										<a className="link-group-item" href={activeClient.linkedin} target="_blank" rel="noopener noreferrer">
											<div className="link-group-icon"><LogoLinkedIn /></div>
											<div className="link-group-name">LinkedIn</div>
										</a>
									</div>
								}

								{/* YouTube Link */}
								{activeClient.youtube &&
									<div className="col col-md-12 col-6">
										<a className="link-group-item" href={activeClient.youtube} target="_blank" rel="noopener noreferrer">
											<div className="link-group-icon"><LogoYouTube /></div>
											<div className="link-group-name">YouTube</div>
										</a>
									</div>
								}

								{/* Twitter Link */}
								{activeClient.twitter &&
									<div className="col col-md-12 col-6">
										<a className="link-group-item" href={activeClient.twitter} target="_blank" rel="noopener noreferrer">
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
								
								{activeClient.products != ''
									?
									JSON.parse(activeClient.products).map((product, index) => (
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
				<div id="personas" className="view-window row tabcontent">

					{/* Header Section */}
					<div className="view-header col-12">
						<h2>Target Personas Overview</h2>
					</div>

					{/* Section 01 - Target Personas */}
					<div className="view-wrapper col-md-6 col-12">
						<h3>Persona #1</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac bibendum tellus, sit amet sodales tortor. Aliquam id pretium mauris, eget rhoncus orci. Nam magna leo, aliquam eget nisl quis, efficitur efficitur ligula. Phasellus sodales malesuada luctus. Pellentesque ut nisi posuere, imperdiet libero vel, accumsan sapien. Fusce semper, lorem a.</p>
					</div>

					{/* Section 02 */}
					<div className="view-wrapper col-md-6 col-12">
						<h3>??</h3>
						<></>
					</div>

				</div>


				{/* Window for Toppics */}
				<div id="topics" className="view-window row tabcontent">

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
				<div id="settings" className="view-window row tabcontent">

					{/* Header Section */}
					<div className="view-header col-12">
						<h2>Client Settings</h2>
					</div>

					{/* Section 01 - Update Client Info */}
					<div className="view-wrapper col-md-6 col-12">
						<h3>Update Client Info</h3>
						{clientEdits}
						<button className="btn btn-danger" onClick={() => deleteClient(activeClient.id)}>Delete</button>
						<button className="btn btn-danger" onClick={() => console.log("Delete Button Has Been Deactivated")}>Delete</button>
						<button className="btn btn-secondary" onClick={() => handleEdit(activeClient)}>Edit</button>
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