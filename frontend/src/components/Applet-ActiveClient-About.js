import React, { useContext } from 'react';

import { SharedStateContext } from './_SharedStateComponent';

import { ReactComponent as LogoGlobe } from "./../assets/links-globe.svg"
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
		<div id="tabcontent-about" className="view-window row tabcontent">

			{/* Section 01 - Company Overview */}
			<div className='view-body col-12'>
				<div className='row'>

					{/* Overview Header */}
					<div className="col-12">
						<h1>Company Overview</h1>
					</div>	

					{/* Description */}
					<div id="description-wrapper" className="view-wrapper col-md-9 col-12">
						<h2>Description</h2>
						<p>{currentClient.description}</p>
						<p>{currentClient.descriptionaddon}</p>
					</div>

					{/* Website & Social Links */}
					<div id="link-group-wrapper" className="view-wrapper col-md-3 col-12">
						<h2>Links</h2>
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


					{/* Products & Services */}
					<div id="product-group-wrapper" className="view-wrapper col-md-12 col-12">
						<h2>Products & Services</h2>

						<div className="row">
							{currentClient.products
								?
								JSON.parse(currentClient.products).map((product, index) => (
									<div className="col col-md-4 col-12" key={index}>
										<div className='product-group-item'>
											<h3>{product.name}</h3>
											<h5>{product.description}</h5>
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
		</div>
	);
}