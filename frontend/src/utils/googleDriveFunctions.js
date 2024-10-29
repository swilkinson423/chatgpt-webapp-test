import axios from 'axios';

// ----------------------------------------------
// -------- GOOGLE API DECLARATIONS -------------
// ----------------------------------------------


// --+--+-- Google Drive Folders --+--+---------

// Google Drive Folder IDs
const rootFolderId = null;
const clientsFolderId = '1F3AMFb_DJMbjrbtrgb6SwG5y6wSlh3-X';


// Gets the IDs for parent folder based on name
export async function getParentFolderId(folderName) {
	switch (folderName) {
		
		case 'clientFiles':
			return clientsFolderId;
		
		default:
			return rootFolderId;

	}
}


// --+--+-- Google Drive Template Files --+--+--

// Google Drive Template File IDs
const clientOverviewTemplate = '1uoiW8Q2PUaVSosAlIGGMoX8AT_3JqpUJDLghz5W1R-Q';
const competitorGuideTemplate = '1v2l-8wNlzGbCe2ezcMmDTRX2ArcmSiiq49XZHMVZxgc';
const personaOverviewTemplate = '1Ln3NZurM0cK-0T38t-J6-ly6phDlDtp43zwrWxVJaDU';
const styleGuideTemplate = '1eVrG8R1RrjGvRM-8NtpPdhCY6dS_g3iWV2Ia9Zeugdw';


export async function getFileId(fileToGet) {
	
	switch (fileToGet) {
		
		case 'clientOverviewTemplate':
			return clientOverviewTemplate;
		
		case 'competitorGuideTemplate':
			return competitorGuideTemplate;

		case 'personaOverviewTemplate':
			return personaOverviewTemplate;

		case 'styleGuideTemplate':
			return styleGuideTemplate;
		
		default:
			return fileToGet;

	}
}



// ----------------------------------------------
// -------- Utility Functions -------------------
// ----------------------------------------------

// Create a folder
export async function createGoogleDriveFolder(folderName, parentFolder = null) {
	const parentFolderId = parentFolder ? await getParentFolderId(parentFolder) : rootFolderId;

	try {
		const response = await axios.post('http://localhost:3000/api/google-drive/folder', {
			folderName,
			parentFolderId,
		});
		return response.data; // Folder ID will be returned whether new or existing
	} catch (error) {
		console.error('Error creating or finding folder:', error);
		throw error;
	}
}

// Delete a folder by ID
export async function deleteGoogleDriveFolder(folderId) {
	try {
		const response = await axios.delete(`http://localhost:3000/api/google-drive/folder/${folderId}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting folder:', error);
		throw error;
	}
}

// Create a file in a folder
export async function createGoogleDriveFile(folderId, fileName, mimeType = 'text/plain', content = '') {
	try {
		const response = await axios.post('http://localhost:3000/api/google-drive/file', {
			folderId,
			fileName,
			mimeType,
			content,
		});
		return response.data;
	} catch (error) {
		console.error('Error creating file:', error);
		throw error;
	}
}

// Delete a file by ID
export async function deleteGoogleDriveFile(fileId) {
	try {
		const response = await axios.delete(`http://localhost:3000/api/google-drive/file/${fileId}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting file:', error);
		throw error;
	}
}

// Edit a file's metadata (e.g., name) by ID
export async function editGoogleDriveFile(fileId, updates) {
	try {
		const response = await axios.patch(`http://localhost:3000/api/google-drive/file/${fileId}`, updates);
		return response.data;
	} catch (error) {
		console.error('Error editing file:', error);
		throw error;
	}
}