const express = require('express');
const router = express.Router();
const { createGoogleDriveFolder, deleteGoogleDriveFolder, createGoogleDriveFile, deleteGoogleDriveFile, editGoogleDriveFile } = require('../services/googleDriveService');

// ----------------------------------------------
// -------- Google API Endpoints ----------------
// ----------------------------------------------

// Route to create a folder
router.post('/folder', async (req, res) => {
	try {
		const { folderName, parentFolderId } = req.body;
		const folder = await createGoogleDriveFolder(folderName, parentFolderId);
		res.status(201).json({ success: true, folder });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
});

// Route to delete a folder
router.delete('/folder/:id', async (req, res) => {
	try {
		await deleteGoogleDriveFolder(req.params.id);
		res.status(200).json({ success: true });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
});

// Route to create a file
router.post('/file', async (req, res) => {
	try {
		const { fileName, folderId, mimeType, content } = req.body;
		const file = await createGoogleDriveFile(fileName, folderId, mimeType, content);
		res.status(201).json({ success: true, file });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
});

// Route to delete a file
router.delete('/file/:id', async (req, res) => {
	try {
		await deleteGoogleDriveFile(req.params.id);
		res.status(200).json({ success: true });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
});

// Route to edit a file
router.patch('/file/:id', async (req, res) => {
	try {
		const updates = req.body;
		const file = await editGoogleDriveFile(req.params.id, updates);
		res.status(200).json({ success: true, file });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
});

module.exports = router;
