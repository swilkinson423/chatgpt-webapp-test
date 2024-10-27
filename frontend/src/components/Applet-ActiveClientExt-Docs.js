import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

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
import Rating from '@mui/material/Rating';

import { SharedStateContext } from './_SharedStateComponent';

// Reusable Document Card
function DocumentCard({ title, filetype, url, thumbnail, rating, editableDescription }) {
	return (
		<Card sx={{ width: 150, height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 1 }}>
			<CardContent sx={{ textAlign: 'center' }}>
				<img src={thumbnail || 'default-thumbnail.png'} alt="Document Thumbnail" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '5px' }} />
				<Typography variant="subtitle1" gutterBottom>{title}</Typography>
				<Typography variant="caption" color="textSecondary">{filetype}</Typography>
				{rating !== undefined && <Rating name="document-rating" value={rating} readOnly size="small" />}
				{editableDescription && <TextField label="Description" variant="outlined" fullWidth size="small" multiline />}
			</CardContent>
		</Card>
	);
}

export default function AppletActiveClientDocs() {

	const { currentClient } = useContext(SharedStateContext);

	const [open, setOpen] = useState(false);
	const [newDoc, setNewDoc] = useState({
		name: '',
		url: '',
		category: '',
		filetype: '',
		thumbnail: '',
		rating: 0,
		description: ''
	});

	// Document categories state
	const [documents, setDocuments] = useState({
		operationalDocs: [],
		templates: [],
		samples: [],
		others: []
	});

	// Fetch documents on component mount
	useEffect(() => {
		const fetchDocuments = async () => {
			try {
				const response = await axios.get(`http://localhost:3000/companies/${currentClient.id}/documents`);
				const docsByCategory = {
					operationalDocs: [],
					templates: [],
					samples: [],
					others: []
				};

				// Categorize documents
				response.data.data.forEach((doc) => {
					console.log(doc);
					switch (doc.category) {
						case 'operationalDocs':
							docsByCategory.operationalDocs.push(doc);
							break;
						case 'templates':
							docsByCategory.templates.push(doc);
							break;
						case 'samples':
							docsByCategory.samples.push(doc);
							break;
						default:
							docsByCategory.others.push(doc);
							break;
					}
				});
				setDocuments(docsByCategory);
			} catch (error) {
				console.error('Error fetching documents:', error);
			}
		};

		fetchDocuments();
	}, [currentClient.id]);

	// Open and close dialog
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// Handle form input changes
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewDoc((prev) => ({ ...prev, [name]: value }));
	};

	// Add new document and associate it with the current client
    const handleAddDocument = async () => {
		try {
			// Step 1: Create the document
			const documentResponse = await axios.post('http://localhost:3000/documents', newDoc);
			const documentId = documentResponse.data.data.document_id;
	
			// Confirm that documentId exists
			if (!documentId) {
				console.error("Document creation failed. No document_id returned.");
				alert("Failed to create document. Please try again.");
				return;
			}
	
			// Step 2: Associate the document with the current client
			await axios.post(`http://localhost:3000/documents/${documentId}/companies`, {
				company_id: currentClient.id
			});
	
			// Step 3: Update UI with the new document
			setDocuments((prev) => ({
				...prev,
				[newDoc.category]: [...prev[newDoc.category], { ...newDoc, id: documentId }]
			}));
	
			handleClose();
		} catch (err) {
			console.error('Error adding document:', err);
			alert("An error occurred while adding the document. Please check your input and try again.");
		}
	};

	return (
		<Box>
			<Stack direction="row" justifyContent="space-between" alignItems="center">
				<Typography variant="h5">Documents:</Typography>
				<Button variant="contained" onClick={handleOpen}>Add New +</Button>
			</Stack>

			{/* Categories */}
			{['operationalDocs', 'templates', 'samples', 'others'].map((category) => (
				<Box key={category} sx={{ boxShadow: 'inset 0 0 5px black', p: 2, mb: 2 }}>
					<Typography variant="h6">{category.replace(/([A-Z])/g, ' $1').trim()}:</Typography>
					<Stack direction="row" spacing={2} mt={1}>
						{documents[category].length > 0 ? (
							documents[category].map((doc, index) => (
								<DocumentCard
									key={index}
									name={doc.name}
									filetype={doc.filetype}
									url={doc.url}
									thumbnail={doc.thumbnail}
									rating={category === 'samples' ? doc.rating : undefined}
									description={category === 'samples'}
								/>
							))
						) : (
							<DocumentCard title={'{No Docs}'} />
						)}
					</Stack>
				</Box>
			))}

			{/* Dialog for Adding New Document */}
			<Dialog open={open} onClose={handleClose}>
				<Box p={3}>
					<Typography variant="h6">Add New Document</Typography>

					{/* Document Title */}
					<TextField
						fullWidth
						label="Document Title"
						name="name"
						value={newDoc.name}
						onChange={handleInputChange}
						sx={{ mt: 2 }}
					/>
					
					{/* Select Document Category */}
					<Select
						fullWidth
						value={newDoc.category}
						name="category"
						onChange={handleInputChange}
						displayEmpty
						sx={{ mt: 2 }}
					>
						<MenuItem value="" disabled>Select Document Category</MenuItem>
						<MenuItem value="operationalDocs">Operational Docs</MenuItem>
						<MenuItem value="templates">Templates</MenuItem>
						<MenuItem value="samples">Samples</MenuItem>
						<MenuItem value="others">Others</MenuItem>
					</Select>

					{/* File Type */}
					<Select
						fullWidth
						value={newDoc.filetype}
						name="filetype"
						onChange={handleInputChange}
						displayEmpty
						sx={{ mt: 2 }}
					>
						<MenuItem value="" disabled>Select File Type</MenuItem>
						<MenuItem value="Doc">Doc</MenuItem>
						<MenuItem value="Spreadsheet">Spreadsheet</MenuItem>
						<MenuItem value="Other">Other</MenuItem>
					</Select>

					{/* Document URL */}
					<TextField
						fullWidth
						label="Document URL (e.g., Google Docs link)"
						name="url"
						value={newDoc.url}
						onChange={handleInputChange}
						sx={{ mt: 2 }}
					/>

					{/* Star Rating for Samples */}
					{newDoc.category === 'samples' && (
						<>
							<Typography variant="body2" sx={{ mt: 2 }}>Rating:</Typography>
							<Rating
								name="rating"
								value={newDoc.rating}
								onChange={(event, newValue) => setNewDoc((prev) => ({ ...prev, rating: newValue }))}
								sx={{ mt: 1 }}
							/>
						</>
					)}

					{/* Description for Samples */}
					{newDoc.category === 'samples' && (
						<TextField
							fullWidth
							label="Description"
							name="description"
							multiline
							rows={2}
							value={newDoc.description}
							onChange={handleInputChange}
							sx={{ mt: 2 }}
						/>
					)}

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
