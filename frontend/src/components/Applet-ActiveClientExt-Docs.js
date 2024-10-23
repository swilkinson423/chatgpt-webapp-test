import React, { useState, useContext } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


import { SharedStateContext } from './_SharedStateComponent';

// Reusable Document Card
function DocumentCard({ title }) {
	return (
		<Card sx={{ width: 100, height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<CardContent>
				<Typography align="center">{title}</Typography>
			</CardContent>
		</Card>
	);
}

export default function AppletActiveClientDocs() {

	const { isDarkMode, currentClient } = useContext(SharedStateContext);

	const [open, setOpen] = useState(false);
	const [newDoc, setNewDoc] = useState({ type: '', title: '', url: '' });

	// Document categories state
	const [documents, setDocuments] = useState({
		operationalDocs: [],
		templates: [],
		samples: [],
		others: []
	});

	// Open dialog
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// Handle form input changes
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewDoc((prev) => ({ ...prev, [name]: value }));
	};

	// Add new document
	const handleAddDocument = () => {
		setDocuments((prev) => ({
			...prev,
			[newDoc.type]: [...prev[newDoc.type], { title: newDoc.title, url: newDoc.url }]
		}));
		handleClose();
	};




	return (

		<Box>
			<Stack direction="row" justifyContent="space-between" alignItems="center">
				<Typography variant="h5">Documents:</Typography>
				<Button variant="contained" onClick={handleOpen}>Add New +</Button>
			</Stack>

			{/* Categories */}
			<Box sx={{ boxShadow: 'inset 0 0 5px black', p: 2, mb: 2 }}>
				<Typography variant="h6">Operational Docs:</Typography>
				<Stack direction="row" spacing={2} mt={1}>
					{documents.operationalDocs.length > 0
					?
						documents.operationalDocs.map((doc, index) => (<DocumentCard key={index} title={doc.title} />))
					:
						<DocumentCard title={'{No Docs}'} />
					}
				</Stack>
			</Box>

			<Box sx={{ boxShadow: 'inset 0 0 5px black', p: 2, mb: 2 }}>
				<Typography variant="h6">Templates:</Typography>
				<Stack direction="row" spacing={2} mt={1}>
					{documents.templates.length > 0
					?
						documents.templates.map((doc, index) => (<DocumentCard key={index} title={doc.title} />))
					:
						<DocumentCard title={'{No Docs}'} />
					}
				</Stack>
			</Box>

			<Box sx={{ boxShadow: 'inset 0 0 5px black', p: 2, mb: 2 }}>
				<Typography variant="h6">Samples:</Typography>
				<Stack direction="row" spacing={2} mt={1}>
					{documents.samples.length > 0
					?
						documents.samples.map((doc, index) => (<DocumentCard key={index} title={doc.title} />))
					:
						<DocumentCard title={'{No Docs}'} />
					}
				</Stack>
			</Box>

			{/* Dialog for Adding New Document */}
			<Dialog open={open} onClose={handleClose}>
				<Box p={3}>
					<Typography variant="h6">Add New Document</Typography>

					{/* Select Document Type */}
					<Select
						fullWidth
						value={newDoc.type}
						name="type"
						onChange={handleInputChange}
						displayEmpty
						sx={{ mt: 2 }}
					>
						<MenuItem value="" disabled>Select Document Type</MenuItem>
						<MenuItem value="operationalDocs">Operational Docs</MenuItem>
						<MenuItem value="templates">Templates</MenuItem>
						<MenuItem value="samples">Samples</MenuItem>
						<MenuItem value="others">Others</MenuItem>
					</Select>

					{/* Document Title */}
					<TextField
						fullWidth
						label="Document Title"
						name="title"
						value={newDoc.title}
						onChange={handleInputChange}
						sx={{ mt: 2 }}
					/>

					{/* Document URL */}
					<TextField
						fullWidth
						label="Google Doc URL"
						name="url"
						value={newDoc.url}
						onChange={handleInputChange}
						sx={{ mt: 2 }}
					/>

					{/* Add Button */}
					<Button
						fullWidth
						variant="contained"
						onClick={handleAddDocument}
						sx={{ mt: 2 }}
					>
						Add Document
					</Button>
				</Box>
			</Dialog>
		</Box>
	);
}
