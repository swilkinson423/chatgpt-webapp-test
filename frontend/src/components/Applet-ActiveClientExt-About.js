import React, { useContext } from 'react';

import { SharedStateContext } from './_SharedStateComponent';

import { ReactComponent as LogoLaptop } from "./../assets/links-laptop.svg"
import { ReactComponent as LogoLinkedIn } from "./../assets/links-linkedin.svg"
import { ReactComponent as LogoYouTube } from "./../assets/links-youtube.svg"
import { ReactComponent as LogoTwitter } from "./../assets/links-twitter.svg"
import { ReactComponent as LogoFacebook } from "./../assets/links-facebook.svg"
import { ReactComponent as LogoInstagram } from "./../assets/links-instagram.svg"
import { ReactComponent as LogoTikTok } from "./../assets/links-tiktok.svg"

export default function AppletActiveClientAbout() {

	const { currentClient } = useContext(SharedStateContext);

	return (

		/* --+--+-- VIEW CLIENT INFO --+--+-- */
		<div id="tabcontent-about" className="view-window tabcontent">

			{/* Overview Header */}
			<div>
				<h1>Company Overview</h1>
			</div>	

			{/* Description */}
			<div>
				<h2>Description</h2>
				<p>{currentClient.description}</p>
				<p>{currentClient.descriptionaddon}</p>
			</div>


			{/* Website & Social Links */}
			<div>
				<h2>Links</h2>

				{/* Website Link */}
				{currentClient.website &&
					<a href={currentClient.website} target="_blank" rel="noopener noreferrer">
						<div><LogoLaptop /></div>
						<div>Website</div>
					</a>
				}

				{/* LinkedIn Link */}
				{currentClient.linkedin &&
					<a href={currentClient.linkedin} target="_blank" rel="noopener noreferrer">
						<div><LogoLinkedIn /></div>
						<div>LinkedIn</div>
					</a>
				}

				{/* YouTube Link */}
				{currentClient.youtube &&
					<a href={currentClient.youtube} target="_blank" rel="noopener noreferrer">
						<div><LogoYouTube /></div>
						<div>YouTube</div>
					</a>

				}

				{/* Twitter Link */}
				{currentClient.twitter &&
					<a href={currentClient.twitter} target="_blank" rel="noopener noreferrer">
						<div><LogoTwitter /></div>
						<div>Twitter</div>
					</a>
				}

			</div>


			{/* Products & Services */}
			<h2>Products & Services</h2>

			{currentClient.products
			?
				JSON.parse(currentClient.products).map((product, index) => (
					<div key={index}>
						<h3 key={"name" + index}>{product.name}</h3>
						<p key={"description" + index}>{product.description}</p>
					</div>
				))
			:
				<p>No Products & Services Found</p>
			}


		</div>

	);
}