// ----------------------------------------------
// -------- EXPRESS SERVER SETUP ----------------
// ----------------------------------------------

const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

app.listen(port, () => {
	console.log(`App running on http://localhost:${port}`);
});


// ----------------------------------------------
// --- CONNECT FRONT<>BACK ON DIFFERENT PORTS ---
// ----------------------------------------------
const cors = require('cors');
app.use(cors());


// ----------------------------------------------
// -------- NODE <> POSTGRESS CONNECTION --------
// ----------------------------------------------

const { Pool } = require('pg');
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'fullstack_db',
	password: '2524',
	port: 5432,
});

// Example query to test the connection
pool.query('SELECT NOW()', (err, res) => {
	if (err) {
		console.error('Error connecting to the database', err);
	} else {
		console.log('Connection to the database established at:', res.rows[0]);
	}
});



// ----------------------------------------------
// -------- RESTful Endpoints -------------------
// ----------------------------------------------

// GET Endpoint
app.get('/clients', async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM clients FULL JOIN socials ON id = client_id');
		res.status(200).json(result.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server error' });
	}
});

// GET Endpoint
app.get('/clients/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const result = await pool.query('SELECT * FROM clients FULL JOIN socials ON id = client_id WHERE id = $1', [id]);
		if (result.rows.length === 0) {
			// Return a 404 if the Client is not found
			return res.status(404).json({ error: 'Client not found' });
		}
		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server error' });
	}
});


// POST Endpoint
app.post('/clients', async (req, res) => {
	var { name, website, description, descriptionaddon, products, personas, linkedin, youtube, twitter, facebook, instagram, tiktok } = req.body;
	try {
		const result = await pool.query(
			'WITH post_new_client AS (INSERT INTO clients (name, website, description, descriptionaddon, products, personas) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id) INSERT INTO socials (client_id, linkedin, youtube, twitter, facebook, instagram, tiktok) SELECT client.id, $7, $8, $9, $10, $11, $12 FROM post_new_client client RETURNING client_id AS id',
			[name, website, description, descriptionaddon, products, personas, linkedin, youtube, twitter, facebook, instagram, tiktok]
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server error' });
	}
});

// PUT Endpoint
app.put('/clients/:id', async (req, res) => {
	const { id } = req.params;
	const { name, website, description, descriptionaddon, products, personas, linkedin, youtube, twitter, facebook, instagram, tiktok } = req.body;
	try {
		const result = await pool.query(
			'WITH update_client AS (UPDATE clients SET name = $2, website = $3, description = $4, descriptionaddon = $5, products = $6, personas = $7 WHERE id = $1) UPDATE socials SET linkedin = $8, youtube = $9, twitter = $10, facebook = $11, instagram = $12, tiktok = $13 WHERE client_id = $1',
			[id, name, website, description, descriptionaddon, products, personas, linkedin, youtube, twitter, facebook, instagram, tiktok]
		);
		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server error' });
	}
});

// DELETE Endpoint
app.delete('/clients/:id', async (req, res) => {
	const { id } = req.params;
	try {
		await pool.query('DELETE FROM clients WHERE id = $1', [id]);
		res.status(200).json({ message: 'Client deleted successfully' });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server error' });
	}
});

