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
// -------- SERVER-SIDE URL SCRAPING ------------ {TO DELETE???}
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
// -------- SERVER-SIDE SCREENSHOT CAPTURING ----
// ----------------------------------------------
// Import necessary modules
const puppeteer = require('puppeteer');
const { PuppeteerBlocker } = require('@cliqz/adblocker-puppeteer');
const fetch = require('cross-fetch');

const autoconsent = require('@duckduckgo/autoconsent/dist/autoconsent.puppet.js');
const extraRules = require('@duckduckgo/autoconsent/rules/rules.json');

// Combine rules from duckduckgo autoconsent and consentomatic
const consentomatic = extraRules.consentomatic;
const rules = [
	...autoconsent.rules,
	...Object.keys(consentomatic).map(name => new autoconsent.ConsentOMaticCMP(`com_${name}`, consentomatic[name])),
	...extraRules.autoconsent.map(spec => autoconsent.createAutoCMP(spec)),
];

// Function to capture screenshot as buffer
const captureScreenshot = async (url) => {
		
	const blocker = await PuppeteerBlocker.fromLists(fetch, [
		'https://secure.fanboy.co.nz/fanboy-cookiemonster.txt'
	]);

	const browser = await puppeteer.launch({ headless: true });
	try {
        const page = await browser.newPage();
        
        await blocker.enableBlockingInPage(page); // Enable ad/cookie blocker on the page
        await page.setViewport({ width: 1920, height: 1080 }); // Set viewport size for the screenshot

        // Attach autoconsent to the page to handle cookie consent
        page.once('load', async () => {
            const tab = autoconsent.attachToPage(page, url, rules, 10); // url and rules passed here
            try {
                await tab.checked;  // Check for consent popups
                await tab.doOptIn(); // Automatically opt-in
            } catch (e) {
                console.warn(`CMP error`, e);
            }
        });

		await page.goto(url, { waitUntil: ['load', 'domcontentloaded', 'networkidle0'] }); // Navigate to the target URL
		const screenshot = await page.screenshot({ encoding: 'base64' }); // Take a screenshot and return it in base64 format
        return screenshot;

	} catch (e) {
		console.error(`Error taking screenshot: ${e}`);
        return null;
	} finally {
		await browser.close();
	}

}

// Route to capture screenshot and send as base64
app.get('/capture-screenshot', async (req, res) => {

	const url = req.query.url;
	const screenshotBuffer = await captureScreenshot(url);
	
	if (screenshotBuffer) {
		// Convert buffer to base64 and send it
		const base64Screenshot = `data:image/png;base64, ${screenshotBuffer.toString('base64')}`;
		res.json({ image: base64Screenshot });
	} else {
		res.status(500).json({ error: 'Failed to capture screenshot' });
	}
});


// ----------------------------------------------
// -------- RESTful Endpoints -------------------
// ----------------------------------------------


// --+--+-- GET ENDPOINTS --+--+--

// GET Endpoint - All Companies
app.get('/companies', async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM companies');
		res.status(200).json(result.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server error' });
	}
});

// GET Endpoint - All Clients
app.get('/clients', async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM companies WHERE is_client = true');
		res.status(200).json(result.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server error' });
	}
});

// GET Endpoint - Client Info
app.get('/clients/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const result = await pool.query('SELECT * FROM companies FULL JOIN socials ON id = company_id FULL JOIN products ON id = product_id FULL JOIN personas ON id = persona_id WHERE id = $1', [id]);
		if (result.rows.length === 0) {
			// Return a 404 if the Company is not found
			return res.status(404).json({ error: 'Company not found' });
		}
		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server error' });
	}
});

// GET Endpoint - Client Products
app.get('/clients/:id/products', async (req, res) => {
	const { id } = req.params;
	try {
		const result = await pool.query('SELECT * FROM products WHERE client_id = $1', [id]);
		if (result.rows.length === 0) {
			// Return a 404 if not found
			return res.status(404).json({ error: 'Products & Services not found' });
		}
		res.status(200).json(result.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server error' });
	}
});

// GET Endpoint - Client Personas
app.get('/clients/:id/personas', async (req, res) => {
	const { id } = req.params;
	try {
		const result = await pool.query('SELECT * FROM personas WHERE client_id = $1', [id]);
		if (result.rows.length === 0) {
			// Return a 404 if not found
			return res.status(404).json({ error: 'Target Personas not found' });
		}
		res.status(200).json(result.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server error' });
	}
});



// --+--+-- POST ENDPOINTS --+--+--

// POST Endpoint - Create a new Company
app.post('/companies', async (req, res) => {
	var { name, website, is_client } = req.body;
	try {
		const result = await pool.query(
			'INSERT INTO companies (name, website, is_client) VALUES ($1, $2, $3) RETURNING id',
			[name, website, is_client]
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server error' });
	}
});

// POST Endpoint - Create a new Product
app.post('/products', async (req, res) => {
	var { name, description, client_id, competitors } = req.body;
	try {
		const result = await pool.query(
			'INSERT INTO products (name, description, client_id, competitors) VALUES ($1, $2, $3, $4) RETURNING client_id',
			[name, description, client_id, competitors]
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server error' });
	}
});

// POST Endpoint - Create a new persona
app.post('/personas', async (req, res) => {
	var { name, description, client_id, products } = req.body;
	try {
		const result = await pool.query(
			'INSERT INTO personas (name, description, client_id, products) VALUES ($1, $2, $3, $4) RETURNING client_id',
			[name, description, client_id, products]
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server error' });
	}
});



// --+--+-- PUT ENDPOINTS --+--+--

// PUT Endpoint - Update a Company
app.put('/companies/:id', async (req, res) => {
	const { id } = req.params;
	const { name, website, is_client, description, descriptionaddon } = req.body;
	try {
		const result = await pool.query(
			'UPDATE companies SET name = $2, website = $3, is_client = $4, description = $5, descriptionaddon = $6, WHERE id = $1',
			[id, name, website, is_client, description, descriptionaddon]
		);
		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server error' });
	}
});

// PUT Endpoint - Update Socials
app.put('/companies/:id/socials', async (req, res) => {
	const { id } = req.params;
	const { linkedin, youtube, twitter, facebook, instagram, tiktok, pinterest } = req.body;
	try {
		const result = await pool.query(
			'UPDATE socials SET linkedin = $2, youtube = $3, twitter = $4, facebook = $5, instagram = $6, tiktok = $7, pinterest = $8 WHERE company_id = $1',
			[id, linkedin, youtube, twitter, facebook, instagram, tiktok, pinterest]
		);
		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server error' });
	}
});

// PUT Endpoint - Update a Product
app.put('/products/:id', async (req, res) => {
	const { id } = req.params;
	const { name, description, client_id, competitors } = req.body;
	try {
		const result = await pool.query(
			'UPDATE products SET name = $2, description = $3, client_id = $4, competitors = $5, WHERE product_id = $1',
			[id, name, description, client_id, competitors ]
		);
		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server error' });
	}
});

// PUT Endpoint - Update a Persona
app.put('/personas/:id', async (req, res) => {
	const { id } = req.params;
	const { name, description, client_id, competitors } = req.body;
	try {
		const result = await pool.query(
			'UPDATE personas SET name = $2, description = $3, client_id = $4, products = $5, WHERE persona_id = $1',
			[id, name, description, client_id, competitors ]
		);
		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server error' });
	}
});

// --+--+-- DELETE ENDPOINTS --+--+--

// DELETE Endpoint - Delete a Company
app.delete('/companies/:id', async (req, res) => {
	const { id } = req.params;
	try {
		await pool.query('DELETE FROM companies WHERE id = $1', [id]);
		res.status(200).json({ message: 'Company deleted successfully' });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server error' });
	}
});

// DELETE Endpoint - Delete a Product
app.delete('/products/:id', async (req, res) => {
	const { id } = req.params;
	try {
		await pool.query('DELETE FROM products WHERE product_id = $1', [id]);
		res.status(200).json({ message: 'Product deleted successfully' });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server error' });
	}
});

// DELETE Endpoint - Delete a Persona
app.delete('/personas/:id', async (req, res) => {
	const { id } = req.params;
	try {
		await pool.query('DELETE FROM personas WHERE persona_id = $1', [id]);
		res.status(200).json({ message: 'Persona deleted successfully' });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server error' });
	}
});
