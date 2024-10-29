require('dotenv').config({ path: '../config/.env' });
const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');
const { authenticate } = require('@google-cloud/local-auth');

// Define paths for credentials and token
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const TOKEN_PATH = path.join(__dirname, '../config/token.json');
const CREDENTIALS_PATH = path.join(__dirname, '../config/credentials.json');

// Load or request authorization to call APIs
async function authorize() {
	let client = await loadSavedCredentialsIfExist();
	if (client) return client;

	client = await authenticate({
		scopes: SCOPES,
		keyfilePath: CREDENTIALS_PATH,
		redirectUri: 'http://localhost:3002/oauth2callback',
	});

	if (client.credentials) {
		await saveCredentials(client);
	}

	return client;
}

// Load existing credentials, if available
async function loadSavedCredentialsIfExist() {
	try {
		const content = await fs.readFile(TOKEN_PATH);
		const credentials = JSON.parse(content);
		return google.auth.fromJSON(credentials);
	} catch (err) {
		console.log("No saved credentials found, prompting for new authorization.");
		return null;
	}
}

// Save new credentials to token.json
async function saveCredentials(client) {
	try {
		const content = await fs.readFile(CREDENTIALS_PATH);
		const keys = JSON.parse(content);
		const key = keys.installed || keys.web;
		const payload = JSON.stringify({
			type: 'authorized_user',
			client_id: key.client_id,
			client_secret: key.client_secret,
			refresh_token: client.credentials.refresh_token,
		});
		await fs.writeFile(TOKEN_PATH, payload);
		console.log('Token successfully saved to', TOKEN_PATH);
	} catch (error) {
		console.error('Error saving credentials:', error);
	}
}

module.exports = { authorize };
