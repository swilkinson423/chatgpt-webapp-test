import axios from 'axios';

import { deleteGoogleDriveFolder } from './googleDriveFunctions';

// --+--+-- UPDATE FUNCTIONS --+--+--

// Update a Client's Overview
export async function updateClientOverview(client_id, client_info) {
	try {
		await axios.put(`http://localhost:3000/companies/${client_id}`, client_info);
	} catch (err) {
		console.error('Error updating client:', err);
		alert('Failed to update client. Please try again.');
	}
};

// Update a Client's Socials
export async function updateClientSocials(client_id, socials_info) {
	try {
		await axios.put(`http://localhost:3000/companies/${client_id}/socials`, socials_info);
		setIsEditing(null);
	} catch (err) {
		console.error('Error updating socials:', err);
		alert('Failed to update socials. Please try again.');
	}
};

// Update a Products
export async function updateProduct(product_id, product_info) {
	try {
		await axios.put(`http://localhost:3000/products/${product_id}`, product_info);
	} catch (err) {
		console.error('Error updating product:', err);
		alert('Failed to update product. Please try again.');
	}
};

// Update a Persona
export async function updatePersona(persona_id, persona_info) {
	try {
		await axios.put(`http://localhost:3000/personas/${persona_id}`, persona_info);
	} catch (err) {
		console.error('Error updating persona:', err);
		alert('Failed to update persona. Please try again.');
	}
};


// --+--+-- DELETE FUNCTIONS --+--+--

// Delete a client
export async function deleteClient(client_id, drivefolder) {
	try {
		await deleteGoogleDriveFolder(drivefolder); // Delete the client's Google Drive folder
		await axios.delete(`http://localhost:3000/companies/${client_id}`); // Delete client from database
		
	} catch (err) {
		console.error('Error deleting client:', err);
		alert('Failed to delete client. Please try again.');
	}
};

// Delete a Product
export async function deleteProduct(product_id) {
	try {
		await axios.delete(`http://localhost:3000/products/${product_id}`);
	} catch (err) {
		console.error('Error deleting product:', err);
		alert('Failed to delete product. Please try again.');
	}
};

// Delete a Persona	
export async function deletePersona(persona_id) {
	try {
		await axios.delete(`http://localhost:3000/personas/${persona_id}`);
	} catch (err) {
		console.error('Error deleting persona:', err);
		alert('Failed to delete persona. Please try again.');
	}
};



