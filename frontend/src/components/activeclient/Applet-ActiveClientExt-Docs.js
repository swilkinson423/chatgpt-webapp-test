import React, { useState, useContext } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';

import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { SharedStateContext } from './../_SharedStateComponent';


// TODO - Add ability to create new docs (and create a corresponding Gdocs).
// TODO - Add ability to edit docs metadata (and update metadata for corresponding Gdocs). 
// TODO - Add ability to delete docs (and delete corresponding Gdocs).

// TODO - Add ability to 'link' an exteral doc using an existing URL.
// TODO - Add ability to 'upload' an external doc and store the file.

// TODO - Update styling of docs to add a screenshot of doc, if available, or a default image based on file type


export default function AppletActiveClientDocs() {

	const {
		currentClientOverview,
		currentClientDocs,
	} = useContext(SharedStateContext);


	// Dialog states
	const [openAdd, setOpenAdd] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);

	// Document states
	const [editDoc, setEditDoc] = useState(null);
	const [newDoc, setNewDoc] = useState({
		name: '',
		url: '',
		category: '',
		filetype: '',
		thumbnail: '',
		rating: 0,
		description: ''
	});

	// Handlers for dialogs
	const handleOpenAdd = () => setOpenAdd(true);
	const handleCloseAdd = () => setOpenAdd(false);

	const handleOpenEdit = (document) => {
		setEditDoc(document);
		setOpenEdit(true);
	};
	const handleCloseEdit = () => setOpenEdit(false);

	// Handle input changes for both add and edit forms
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewDoc((prev) => ({ ...prev, [name]: value }));
	};

	const handleEditChange = (event) => {
		const { name, value } = event.target;
		setEditDoc((prev) => ({ ...prev, [name]: value }));
	};

	// Add new document
	const handleAddDocument = async () => {
		try {
			const response = await axios.post('http://localhost:3000/documents', newDoc);
			const documentId = response.data.data.document_id;

			if (!documentId) throw new Error("Document creation failed.");

			await axios.post(`http://localhost:3000/documents/${documentId}/companies`, {
				company_id: currentClientOverview.id
			});

			handleCloseAdd();
		} catch (err) {
			console.error('Error adding document:', err);
			alert("Failed to add document.");
		}
	};

	// Save edited document
	const handleEditSave = async () => {
		try {
			await axios.put(`http://localhost:3000/documents/${editDoc.document_id}`, editDoc);
			alert('Document updated successfully');
			handleCloseEdit();
		} catch (error) {
			console.error('Error updating document:', error);
			alert('Failed to update document');
		}
	};


	return (
		<Stack sx={{ justifyContent: 'space-between' }} spacing={2} >

			{/* Header Section */}
			<Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
				
				{/* Title */}
				<Typography 
					variant='h4' 
					sx={{ 
						maxWidth: '40%', 
						overflow: 'hidden', 
						whiteSpace: 'nowrap', 
						textOverflow: 'ellipsis' 
					}}
				>
					Documents:
				</Typography>

				{/* Button Links */}
				<Stack direction="row" spacing={1} sx={{ maxWidth: '60%'}}>
					
					{/* File Links */}
					<Button sx={{ml: 'auto'}} disabled/>
					<Button startIcon={<NoteAddIcon/>} sx={{ml: '5px', width: '100px'}} variant="contained" onClick={() => console.log('need to add this')}>Create</Button>
					<Button startIcon={<FileOpenIcon/>} sx={{ml: '5px', width: '100px'}} variant="contained" onClick={handleOpenAdd}>Link</Button>
					<Button startIcon={<UploadFileIcon/>} sx={{ml: '5px', width: '100px'}} variant="contained" onClick={() => console.log('need to add this')}>Upload</Button>

				</Stack>

			</Stack>


			{/* Body Section */}

			
			{/* Document Categories */}
			{['operationalDocs', 'templates', 'samples', 'others'].map((category) => (
				<Box key={category} sx={{ boxShadow: 'inset 0 0 5px black', p: 2, mb: 2 }}>
					<Typography variant="h6">{category.replace(/([A-Z])/g, ' $1').trim()}:</Typography>
					<Stack direction="row" spacing={2} mt={1}>
						{currentClientDocs[category]?.length > 0 ? (
							currentClientDocs[category]?.map((doc, index) => (
								<DocumentCard
									key={index}
									document={doc}
									onEdit={handleOpenEdit}
								/>
							))
						) : (
							<Typography>No documents in this category</Typography>
						)}
					</Stack>
				</Box>
			))}


			{/* Dialog for Adding New Document */}
			<Dialog open={openAdd} onClose={handleCloseAdd}>
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
						slotProps={{ htmlInput: { maxLength: 255 } }}
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
						slotProps={{ htmlInput: { maxLength: 255 } }}
					/>

					{/* Description */}
					<TextField
						fullWidth
						label="Description"
						name="description"
						multiline
						rows={2}
						value={newDoc.description}
						onChange={handleInputChange}
						sx={{ mt: 2 }}
						slotProps={{ htmlInput: { maxLength: 255 } }}
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

					<Button fullWidth variant="contained" onClick={handleAddDocument} sx={{ mt: 2 }}>
						Add Document
					</Button>

				</Box>
			</Dialog>

			{/* Dialog for Editing Document */}
			<Dialog open={openEdit} onClose={handleCloseEdit}>
				<Box p={3}>

					<Typography variant="h6">Edit Document</Typography>

					{/* Document Title */}
					<TextField
						fullWidth
						label="Document Title"
						name="name"
						value={editDoc?.name || ''}
						onChange={handleEditChange}
						sx={{ mt: 2 }}
						slotProps={{ htmlInput: { maxLength: 255 } }}
					/>

					{/* Select Document Category */}
					<Select
						fullWidth
						value={editDoc?.category || ''}
						name="category"
						onChange={handleEditChange}
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
						value={editDoc?.filetype || ''}
						name="filetype"
						onChange={handleEditChange}
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
						value={editDoc?.url || ''}
						onChange={handleEditChange}
						sx={{ mt: 2 }}
						slotProps={{ htmlInput: { maxLength: 255 } }}
					/>

					{/* Description for Samples */}
					<TextField
						fullWidth
						label="Description"
						name="description"
						multiline
						rows={2}
						value={editDoc?.description || ''}
						onChange={handleEditChange}
						sx={{ mt: 2 }}
					/>

					{/* Star Rating for Samples */}
					{editDoc?.category === 'samples' && (
						<>
							<Typography variant="body2" sx={{ mt: 2 }}>Rating:</Typography>
							<Rating
								name="rating"
								value={editDoc.rating || 0}
								onChange={(event, newValue) => setEditDoc((prev) => ({ ...prev, rating: newValue }))}
								sx={{ mt: 1 }}
							/>
						</>
					)}

					<Button fullWidth variant="contained" onClick={handleEditSave} sx={{ mt: 2 }}>
						Save Changes
					</Button>

				</Box>
			</Dialog>

		</Stack>
	);
}

// Reusable Document Card
function DocumentCard({ document, onEdit }) {
	
	const { name, filetype, url, thumbnail, rating, description, category } = document;
	
	const [hovered, setHovered] = useState(false);
	const isSample = category === 'samples';

	const cardHeight = isSample ? 400 : 300;
	const descriptionMaxHeight = isSample ? '60px' : '40px';

	return (
		<Card
			sx={{
				width: 200,
				height: cardHeight,
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-around',
				overflow: 'hidden',
				boxShadow: 3,
				cursor: 'pointer',
				'&:hover .edit-icon': { display: 'block' }
			}}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{/* Edit icon */}
			{hovered && (
				<Button
					className="edit-icon"
					sx={{ position: 'absolute', top: 4, left: 4, zIndex: 10, display: 'none' }}
					startIcon={<EditIcon />}
					onClick={(e) => {
						e.stopPropagation();
						onEdit(document);
					}}
				/>
			)}

			{/* Document Thumbnail */}
			<CardMedia
				component="img"
				sx={{ minHeight: 150, maxHeight: 150, width: 200, objectFit: 'cover' }}
				image={thumbnail || 'fallback-image.png'}
				alt="Document Thumbnail"
				onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image.png'; }}
			/>

			{/* Document Content */}
			<CardContent
				sx={{
					padding: '2px 10px 2px 10px',
					flexGrow: 1,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'flex-start',
				}}
			>
				<Typography
					variant="subtitle1"
					sx={{
						textAlign: 'center', // Center-aligns the text
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						fontWeight: 'bold',
						m: 0,
					}}
				>
					{name}
				</Typography>

				{isSample && (
					<Rating name="document-rating" value={rating || 0} readOnly size="small" sx={{ mb: 1 }} />
				)}

				<Typography
					variant="body2"
					sx={{
						textAlign: 'center',
						height: descriptionMaxHeight,
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						mt: 1,
						color: 'text.secondary',
					}}
				>
					{description}
				</Typography>

			</CardContent>

			<CardActions sx={{ justifyContent: 'center', mt: 'auto' }}>
				<Button
					endIcon={<OpenInNewIcon />}
					size="small"
					onClick={url ? () => window.open(url, '_blank') : null}
					sx={{
						textAlign: 'center',
						width: '100%',
						position: 'relative',
					}}
				>
					Open
				</Button>
			</CardActions>
		</Card>
	);
}