// ----------------------------------------------
// -------- EXPRESS SERVER SETUP ----------------
// ----------------------------------------------
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

app.listen(port, (err) => {
	if (err) {
		console.error('Error starting the server:', err);
		process.exit(1); // Exit the process with failure code
	}
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
// Example query to test the connection
const { pool } = require('./pool');
pool.query('SELECT NOW()', (err, res) => {
	if (err) {
		console.error('Error connecting to the database', err);
	} else {
		console.log('Connection to the database established at:', res.rows[0]);
	}
});


// ----------------------------------------------
// -------- SERVER-SIDE URL SCRAPING ------------
// ----------------------------------------------
const axios = require('axios');
const { load } = require('cheerio');
const { JSDOM } = require('jsdom');

app.get('/fetch-meta', async (req, res) => {
	const url = req.query.url;

	try {
		const { data } = await axios.get(url);
		const $ = load(data);

		const metaTitle = $('meta[property="og:title"]').attr('content') || $('title').text();
		const metaDescription = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');
		let metaImage = $('meta[property="og:image"]').attr('content') || $('img').first().attr('src');

		res.json({
			title: metaTitle,
			description: metaDescription,
			image: metaImage,
		});

	} catch (err) {
		res.status(500).json({ error: 'Failed to fetch metadata' });
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

