import React, { useState, useContext } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { SharedStateContext } from '../_utils/_SharedStateComponent';

export default function AppletActiveClientTopics() {

	const { currentClientOverview } = useContext(SharedStateContext);

	// Table state
	const [tables, setTables] = useState({
		pending: [],
		inProgress: [],
		complete: [],
	});

	// Collapse state
	const [open, setOpen] = useState({
		pending: true,
		inProgress: true,
		complete: true,
	});

	// Dialog state for adding topics
	const [openDialog, setOpenDialog] = useState(false);
	const [newTopic, setNewTopic] = useState({ title: '', status: 'pending' });

	// Toggle table collapse
	const toggleCollapse = (table) => {
		setOpen((prev) => ({ ...prev, [table]: !prev[table] }));
	};

	// Handle dialog form inputs
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewTopic((prev) => ({ ...prev, [name]: value }));
	};

	// Add new topic
	const handleAddTopic = () => {
		setTables((prev) => ({
			...prev,
			[newTopic.status]: [...prev[newTopic.status], newTopic],
		}));
		setOpenDialog(false);
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
					Topics:
				</Typography>

				{/* Button Links */}
				<Stack direction="row" spacing={1} sx={{ maxWidth: '60%'}}>
					
					{/* Topic Links */}
					<Button variant="contained" onClick={() => setOpenDialog(true)}>Add New +</Button>

				</Stack>

			</Stack>


			{/* Body Section */}
			<Typography variant='p' sx={{ color: '#ff0000' }}>{"{Pending Development}"}</Typography>

			

			{/* Pending Approval Table */}
			<TableSection
				title="Pending Approval"
				rows={tables.pending}
				open={open.pending}
				onToggle={() => toggleCollapse('pending')}
			/>

			{/* In Progress Table */}
			<TableSection
				title="In Progress"
				rows={tables.inProgress}
				open={open.inProgress}
				onToggle={() => toggleCollapse('inProgress')}
			/>

			{/* Complete Table */}
			<TableSection
				title="Complete"
				rows={tables.complete}
				open={open.complete}
				onToggle={() => toggleCollapse('complete')}
			/>

			{/* Dialog for Adding Topics */}
			<Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
				<Box p={3}>
					<Typography variant="h6">Add New Topic</Typography>
					<TextField
						fullWidth
						label="Topic Title"
						name="title"
						value={newTopic.title}
						onChange={handleInputChange}
						sx={{ mt: 2 }}
					/>
					<Select
						fullWidth
						value={newTopic.status}
						name="status"
						onChange={handleInputChange}
						sx={{ mt: 2 }}
					>
						<MenuItem value="pending">Pending Approval</MenuItem>
						<MenuItem value="inProgress">In Progress</MenuItem>
						<MenuItem value="complete">Complete</MenuItem>
					</Select>
					<Button fullWidth variant="contained" onClick={handleAddTopic} sx={{ mt: 2 }}>Add Topic</Button>
				</Box>
			</Dialog>

		</Stack>
	);
}

// Reusable Table Section Component
function TableSection({ title, rows, open, onToggle }) {
	return (
		<Paper elevation={3} sx={{ mt: 3 }}>
			{/* Table Header */}
			<Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: 'grey.700', padding: 1 }}>
				<Typography variant="h6">{title}</Typography>
				<IconButton onClick={onToggle}>
					{open ? <ExpandLess /> : <ExpandMore />}
				</IconButton>
			</Stack>

			{/* Table Content */}
			<Collapse in={open}>
				<TableContainer sx={{ overflowX: 'auto', width: '100%' }}>
					<Table stickyHeader sx={{ minWidth: '150%' }}>
						{/* Table Head */}
						<TableHead>
							<TableRow>
								<TableCell sx={{ width: '200px', position: 'sticky', left: '0', zIndex: 3, backgroundColor: 'grey.500', }}>Topic Title</TableCell>
								<TableCell sx={{ width: '100px', position: 'sticky', left: '300px', zIndex: 3, backgroundColor: 'grey.500', }}>Col 2</TableCell>
								<TableCell sx={{ width: '100px', backgroundColor: 'grey.500', }}>Col 3</TableCell>
								<TableCell sx={{ width: '100px', backgroundColor: 'grey.500', }}>Col 4</TableCell>
								<TableCell sx={{ width: '100px', backgroundColor: 'grey.500', }}>Col 5</TableCell>
								<TableCell sx={{ width: '100px', backgroundColor: 'grey.500', }}>Col 6</TableCell>
								<TableCell sx={{ width: '100px', backgroundColor: 'grey.500', }}>Col 7</TableCell>
								<TableCell sx={{ width: '100px', backgroundColor: 'grey.500', }}>Col 8</TableCell>
							</TableRow>
						</TableHead>
						{/* Table Body */}
						<TableBody>
							{rows.length === 0 ? (
								<TableRow>
									<TableCell colSpan={8} align="center">No Data Available</TableCell>
								</TableRow>
							) : (
								rows.map((row, index) => (
									<TableRow key={index}>
										<TableCell sx={{ position: 'sticky', left: '0', zIndex: 3, backgroundColor: 'white', }}>{row.title}</TableCell>
										<TableCell sx={{ position: 'sticky', left: '200px', zIndex: 3, backgroundColor: 'white', }}>Lorem Ipsum</TableCell>
										<TableCell>Lorem Ipsum</TableCell>
										<TableCell>Lorem Ipsum</TableCell>
										<TableCell>Lorem Ipsum</TableCell>
										<TableCell>Lorem Ipsum</TableCell>
										<TableCell>Lorem Ipsum</TableCell>
										<TableCell>Lorem Ipsum</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Collapse>
		</Paper>
	);
}
