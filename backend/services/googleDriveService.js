// ----------------------------------------------
// -------- GOOGLE API HELPER FUNCTIONS ---------
// ----------------------------------------------
require('dotenv').config();  // Load environment variables from .env
const { google } = require('googleapis');

const { authorize } = require('./generateToken');


// Create a new folder
async function createGoogleDriveFolder(folderName, parentFolderId = null) {
	const authClient = await authorize();
	const drive = google.drive({ version: 'v3', auth: authClient });
	try {
		// Step 1: Search for existing folder by name
		const searchParams = {
			q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`,
			fields: 'files(id, name)',
			spaces: 'drive',
		};
		if (parentFolderId) {
			searchParams.q += ` and '${parentFolderId}' in parents`;
		}

		const searchResponse = await drive.files.list(searchParams);
		const existingFolder = searchResponse.data.files[0];

		if (existingFolder) {
			console.log(`Folder "${folderName}" already exists with ID: ${existingFolder.id}`);
			return existingFolder.id;
		}

		// Step 2: If no existing folder found, create a new one
		const createParams = {
			requestBody: {
				name: folderName,
				mimeType: 'application/vnd.google-apps.folder',
				parents: parentFolderId ? [parentFolderId] : [],
			},
		};

		const createResponse = await drive.files.create(createParams);
		console.log(`Folder "${folderName}" created with ID: ${createResponse.data.id}`);
		return createResponse.data.id;

	} catch (error) {
		console.error('Error finding or creating folder:', error.message);
		throw new Error('Failed to find or create Google Drive folder');
	}
}

// Delete a folder
async function deleteGoogleDriveFolder(folderId) {
	const authClient = await authorize();
	const drive = google.drive({ version: 'v3', auth: authClient });
	return await drive.files.delete({ fileId: folderId });
}

// Create a new file
async function createGoogleDriveFile(fileName, folderId, mimeType, content) {
	const authClient = await authorize();
	const drive = google.drive({ version: 'v3', auth: authClient });
	const requestBody = {
		name: fileName,
		mimeType,
		parents: folderId ? [folderId] : [],
	};
	const media = { mimeType, body: content };
	return await drive.files.create({ requestBody, media });
}

// Delete a file
async function deleteGoogleDriveFile(fileId) {
	const authClient = await authorize();
	const drive = google.drive({ version: 'v3', auth: authClient });
	return await drive.files.delete({ fileId });
}

// Edit a file's metadata (e.g., name)
async function editGoogleDriveFile(fileId, updates) {
	const authClient = await authorize();
	const drive = google.drive({ version: 'v3', auth: authClient });
	return await drive.files.update({ fileId, requestBody: updates });
}

module.exports = {
	createGoogleDriveFolder,
	deleteGoogleDriveFolder,
	createGoogleDriveFile,
	deleteGoogleDriveFile,
	editGoogleDriveFile
};
