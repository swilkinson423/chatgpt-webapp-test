// ----------------------------------------------
// -------- EXPRESS SERVER SETUP ----------------
// ----------------------------------------------
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json({ limit: '10mb' }));

// Start server and handle potential startup errors
app.listen(port, (err) => {
	if (err) {
		console.error('Error starting the server:', err);
		process.exit(1);
	}
	console.log(`App running on http://localhost:${port}`);
});


// ----------------------------------------------
// -------- NODE <> POSTGRES CONNECTION --------
// ----------------------------------------------
const { pool } = require('./pool');
pool.query('SELECT NOW()', (err, res) => {
	if (err) {
		console.error('Error connecting to the database', err);
	} else {
		console.log('Connection to the database established at:', res.rows[0]);
	}
});

// Graceful shutdown for Postgres pool
process.on('SIGINT', () => {
	pool.end(() => {
		console.log('Postgres pool has ended');
		process.exit(0);
	});
});


// ----------------------------------------------
// --- CONNECT FRONT<>BACK ON DIFFERENT PORTS ---
// ----------------------------------------------
const cors = require('cors');
app.use(cors({
	origin: pool.options.frontend,
}));


// ----------------------------------------------
// -------- SERVER-SIDE SCREENSHOT CAPTURING ----
// ----------------------------------------------
const puppeteer = require('puppeteer');
const { PuppeteerBlocker } = require('@cliqz/adblocker-puppeteer');
const fetch = require('cross-fetch');
const autoconsent = require('@duckduckgo/autoconsent/dist/autoconsent.puppet.js');
const extraRules = require('@duckduckgo/autoconsent/rules/rules.json');

const consentomatic = extraRules.consentomatic;
const rules = [
	...autoconsent.rules,
	...Object.keys(consentomatic).map(name => new autoconsent.ConsentOMaticCMP(`com_${name}`, consentomatic[name])),
	...extraRules.autoconsent.map(spec => autoconsent.createAutoCMP(spec)),
];

// Function to capture screenshot
const captureScreenshot = async (url) => {
	const blocker = await PuppeteerBlocker.fromLists(fetch, [
		'https://secure.fanboy.co.nz/fanboy-cookiemonster.txt'
	]);
	const browser = await puppeteer.launch({ headless: true });
	try {
		const page = await browser.newPage();
		await blocker.enableBlockingInPage(page);
		await page.setViewport({ width: 1920, height: 1080 });

		// Attach autoconsent to handle cookie consent popups
		page.once('load', async () => {
			const tab = autoconsent.attachToPage(page, url, rules, 10);
			try {
				await tab.checked;
				await tab.doOptIn();
			} catch (e) {
				console.warn('CMP error', e);
			}
		});
		await page.goto(url, { waitUntil: ['load', 'domcontentloaded', 'networkidle0'] });
		return await page.screenshot({ encoding: 'base64' });
	} catch (e) {
		console.error('Error taking screenshot:', e);
		return null;
	} finally {
		await browser.close();
	}
};

// Route to capture screenshot and send as base64
app.get('/capture-screenshot', async (req, res) => {
	const url = req.query.url;
	const screenshotBuffer = await captureScreenshot(url);
	if (screenshotBuffer) {
		const base64Screenshot = `data:image/png;base64, ${screenshotBuffer}`;
		res.json({ image: base64Screenshot });
	} else {
		res.status(500).json({ error: 'Failed to capture screenshot' });
	}
});


// ----------------------------------------------
// -------- RESTful Endpoints -------------------
// ----------------------------------------------


// Helper function for error handling
const handleError = (res, error, message = 'Server error') => {
	console.error(error.message);
	res.status(500).json({ success: false, error: message });
};


// Helper function for adding relationships to join tables
const addRelationship = async (table, id1, id2, value1, value2) => {
	await pool.query(
		`INSERT INTO ${table} (${id1}, ${id2}) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
		[value1, value2]
	);
};


// Helper function for removing relationships from join tables
const removeRelationship = async (table, id1, id2, value1, value2) => {
	await pool.query(
		`DELETE FROM ${table} WHERE ${id1} = $1 AND ${id2} = $2`,
		[value1, value2]
	);
};


// --+--+-- GET ENDPOINTS --+--+--

// GET Endpoint - All Companies
app.get('/companies', async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM companies');
		res.status(200).json({ success: true, data: result.rows });
	} catch (err) {
		handleError(res, err, 'Failed to fetch companies');
	}
});

// GET Endpoint - All Clients
app.get('/clients', async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM companies WHERE is_client = true');
		res.status(200).json({ success: true, data: result.rows });
	} catch (err) {
		handleError(res, err, 'Failed to fetch clients');
	}
});

// GET Endpoint - Client Overview
app.get('/clients/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const result = await pool.query('SELECT * FROM companies WHERE id = $1', [id]);
		if (result.rows.length === 0) return res.status(404).json({ success: false, message: 'Client not found' });
		res.status(200).json({ success: true, data: result.rows[0] });
	} catch (err) {
		handleError(res, err, 'Failed to fetch client');
	}
});

// GET Endpoint - Client Socials
app.get('/clients/:id/socials', async (req, res) => {
	const { id } = req.params;
	try {
		const result = await pool.query('SELECT * FROM socials WHERE company_id = $1', [id]);
		if (result.rows.length === 0) return res.status(404).json({ success: false, message: 'Socials not found' });
		res.status(200).json({ success: true, data: result.rows[0] });
	} catch (err) {
		handleError(res, err, 'Failed to fetch client socials');
	}
});

// GET Endpoint - All Client Personas
app.get('/clients/:id/personas', async (req, res) => {
	const { id } = req.params;
	try {
		const result = await pool.query('SELECT * FROM personas WHERE company_id = $1', [id]);
		res.status(200).json({ success: true, data: result.rows });
	} catch (err) {
		handleError(res, err, 'Failed to fetch client personas');
	}
});

// GET Endpoint - All Client Products
app.get('/clients/:id/products', async (req, res) => {
	const { id } = req.params;
	try {
		const result = await pool.query('SELECT * FROM products WHERE company_id = $1', [id]);
		res.status(200).json({ success: true, data: result.rows });
	} catch (err) {
		handleError(res, err, 'Failed to fetch client products');
	}
});

// GET Endpoint - All Competitors for a Product
app.get('/products/:product_id/competitors', async (req, res) => {
	const { product_id } = req.params;
	try {
		const result = await pool.query(`
			SELECT c.*
			FROM companies c
			JOIN product_competitors pc ON c.id = pc.competitor_company_id
			WHERE pc.product_id = $1
		`, [product_id]);
		res.status(200).json({ success: true, data: result.rows });
	} catch (err) {
		handleError(res, err, 'Failed to fetch product competitors');
	}
});

// GET Endpoint - All Competitor Companies for a Company
app.get('/companies/:company_id/competitors', async (req, res) => {
	const { company_id } = req.params;
	try {
		const result = await pool.query(`
			SELECT DISTINCT competitor.*
			FROM products p
			JOIN product_competitors pc ON p.product_id = pc.product_id
			JOIN companies competitor ON pc.competitor_company_id = competitor.id
			WHERE p.company_id = $1
		`, [company_id]);
		res.status(200).json({ success: true, data: result.rows });
	} catch (err) {
		handleError(res, err, 'Failed to fetch company competitors');
	}
});

// GET Endpoint - All Products for a Persona
app.get('/personas/:persona_id/products', async (req, res) => {
	const { persona_id } = req.params;
	try {
		const result = await pool.query(`
			SELECT p.*
			FROM products p
			JOIN persona_products pp ON p.product_id = pp.product_id
			WHERE pp.persona_id = $1
		`, [persona_id]);
		res.status(200).json({ success: true, data: result.rows });
	} catch (err) {
		handleError(res, err, 'Failed to fetch persona products');
	}
});

// GET Endpoint - Get All Documents
app.get('/documents', async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM documents');
		res.status(200).json({ success: true, data: result.rows });
	} catch (err) {
		handleError(res, err, 'Failed to fetch documents');
	}
});

// GET Endpoint - Get a single document
app.get('/documents/:document_id', async (req, res) => {
	const { document_id } = req.params;
	try {
		const result = await pool.query('SELECT * FROM documents WHERE document_id = $1', [document_id]);
		if (result.rows.length === 0) return res.status(404).json({ success: false, message: 'Document not found' });
		res.status(200).json({ success: true, data: result.rows[0] });
	} catch (err) {
		handleError(res, err, 'Failed to fetch document');
	}
});

// GET Endpoint - Get all documents for a specific company
app.get('/companies/:company_id/documents', async (req, res) => {
	const { company_id } = req.params;
	try {
		const result = await pool.query(`
			SELECT d.*
			FROM documents d
			JOIN company_documents cd ON d.document_id = cd.document_id
			WHERE cd.company_id = $1
		`, [company_id]);
		res.status(200).json({ success: true, data: result.rows });
	} catch (err) {
		handleError(res, err, 'Failed to fetch company documents');
	}
});

// GET Endpoint - Get all companies associated with a specific document
app.get('/documents/:document_id/companies', async (req, res) => {
	const { document_id } = req.params;
	try {
		const result = await pool.query(`
			SELECT c.*
			FROM companies c
			JOIN company_documents cd ON c.id = cd.company_id
			WHERE cd.document_id = $1
		`, [document_id]);
		res.status(200).json({ success: true, data: result.rows });
	} catch (err) {
		handleError(res, err, 'Failed to fetch document companies');
	}
});



// --+--+-- POST ENDPOINTS --+--+--

// POST Endpoint - Create a new Company
app.post('/companies', async (req, res) => {
	const { name, website, is_client } = req.body;
	try {
		const result = await pool.query(
			'INSERT INTO companies (name, website, is_client) VALUES ($1, $2, $3) RETURNING id',
			[name, website, is_client]
		);
		const newCompanyId = result.rows[0].id;

		// Automatically create a socials entry for the new company
		await pool.query('INSERT INTO socials (company_id) VALUES ($1)', [newCompanyId]);

		res.status(201).json({ success: true, data: result.rows[0] });
	} catch (err) {
		handleError(res, err, 'Failed to create company');
	}
});

// POST Endpoint - Create a new Product with Competitors
app.post('/products', async (req, res) => {
	const { name, description, company_id, competitors } = req.body;
	try {
		const result = await pool.query(
			'INSERT INTO products (name, description, company_id) VALUES ($1, $2, $3) RETURNING product_id',
			[name, description, company_id]
		);
		const productId = result.rows[0].product_id;

		// Insert competitors into the join table
		if (Array.isArray(competitors) && competitors.length > 0) {
			const competitorValues = competitors.map((compId) => `(${productId}, ${compId})`).join(',');
			await pool.query(`INSERT INTO product_competitors (product_id, competitor_company_id) VALUES ${competitorValues}`);
		}

		res.status(201).json({ success: true, data: result.rows[0] });
	} catch (err) {
		handleError(res, err, 'Failed to create product');
	}
});

// POST Endpoint - Add a Single Competitor to a Product
app.post('/products/:product_id/competitors', async (req, res) => {
	const { product_id } = req.params;
	const { competitor_id } = req.body;
	try {
		await addRelationship('product_competitors', 'product_id', 'competitor_company_id', product_id, competitor_id);
		res.status(201).json({ success: true, message: 'Competitor added to Product successfully' });
	} catch (err) {
		handleError(res, err, 'Failed to add competitor to product');
	}
});

// POST Endpoint - Create a New Persona with Associated Products
app.post('/personas', async (req, res) => {
	const { name, description, company_id, products } = req.body;
	try {
		const result = await pool.query(
			'INSERT INTO personas (name, description, company_id) VALUES ($1, $2, $3) RETURNING persona_id',
			[name, description, company_id]
		);
		const personaId = result.rows[0].persona_id;

		// Insert products into the join table
		if (Array.isArray(products) && products.length > 0) {
			const productValues = products.map((prodId) => `(${personaId}, ${prodId})`).join(',');
			await pool.query(`INSERT INTO persona_products (persona_id, product_id) VALUES ${productValues}`);
		}

		res.status(201).json({ success: true, data: result.rows[0] });
	} catch (err) {
		handleError(res, err, 'Failed to create persona');
	}
});

// POST Endpoint - Add a Single Product to a Persona
app.post('/personas/:persona_id/products', async (req, res) => {
	const { persona_id } = req.params;
	const { product_id } = req.body;
	try {
		await addRelationship('persona_products', 'persona_id', 'product_id', persona_id, product_id);
		res.status(201).json({ success: true, message: 'Product added to Persona successfully' });
	} catch (err) {
		handleError(res, err, 'Failed to add product to persona');
	}
});

// POST Endpoint - Create a New Document
app.post('/documents', async (req, res) => {
	const { name, category, filetype, url, thumbnail, rating, description } = req.body;
	try {
		const result = await pool.query(`
			INSERT INTO documents (name, category, filetype, url, thumbnail, rating, description)
			VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING document_id
		`, [name, category, filetype, url, thumbnail, rating, description]);

		res.status(201).json({ success: true, data: result.rows[0] });
	} catch (err) {
		handleError(res, err, 'Failed to create document');
	}
});

// POST Endpoint - Add a Company to a Document
app.post('/documents/:document_id/companies', async (req, res) => {
	const { document_id } = req.params;
	const { company_id } = req.body;
	try {
		await addRelationship('company_documents', 'document_id', 'company_id', document_id, company_id);
		res.status(201).json({ success: true, message: 'Company added to document successfully' });
	} catch (err) {
		handleError(res, err, 'Failed to add company to document');
	}
});



// --+--+-- PUT ENDPOINTS --+--+--

// Helper function to dynamically build update query
const buildUpdateQuery = (table, idColumn, id, data) => {
	const fields = [];
	const values = [];
	Object.entries(data).forEach(([key, value]) => {
		if (value !== undefined) {
			fields.push(`${key} = $${fields.length + 1}`);
			values.push(value);
		}
	});
	if (fields.length === 0) throw new Error('No fields to update');
	values.push(id);
	const query = `UPDATE ${table} SET ${fields.join(', ')} WHERE ${idColumn} = $${fields.length + 1}`;
	return { query, values };
};

// PUT Endpoint - Update a Company
app.put('/companies/:id', async (req, res) => {
	const { id } = req.params;
	const data = req.body;

	try {
		const { query, values } = buildUpdateQuery('companies', 'id', id, data);
		const result = await pool.query(query, values);

		if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Company not found' });
		res.status(200).json({ success: true, message: 'Company updated successfully' });
	} catch (err) {
		handleError(res, err, 'Failed to update company');
	}
});

// PUT Endpoint - Update Socials
app.put('/companies/:id/socials', async (req, res) => {
	const { id } = req.params;
	const data = req.body;

	try {
		const { query, values } = buildUpdateQuery('socials', 'company_id', id, data);
		const result = await pool.query(query, values);

		if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Socials not found' });
		res.status(200).json({ success: true, message: 'Socials updated successfully' });
	} catch (err) {
		handleError(res, err, 'Failed to update socials');
	}
});

// PUT Endpoint - Update a Product
app.put('/products/:id', async (req, res) => {
	const { id } = req.params;
	const data = req.body;

	try {
		const { query, values } = buildUpdateQuery('products', 'product_id', id, data);
		const result = await pool.query(query, values);

		if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Product not found' });
		res.status(200).json({ success: true, message: 'Product updated successfully' });
	} catch (err) {
		handleError(res, err, 'Failed to update product');
	}
});

// PUT Endpoint - Update a Persona
app.put('/personas/:id', async (req, res) => {
	const { id } = req.params;
	const data = req.body;

	try {
		const { query, values } = buildUpdateQuery('personas', 'persona_id', id, data);
		const result = await pool.query(query, values);

		if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Persona not found' });
		res.status(200).json({ success: true, message: 'Persona updated successfully' });
	} catch (err) {
		handleError(res, err, 'Failed to update persona');
	}
});

// PUT Endpoint - Update a Document
app.put('/documents/:document_id', async (req, res) => {
	const { document_id } = req.params;
	const data = req.body;

	try {
		const { query, values } = buildUpdateQuery('documents', 'document_id', document_id, data);
		const result = await pool.query(query, values);

		if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Document not found' });
		res.status(200).json({ success: true, message: 'Document updated successfully' });
	} catch (err) {
		handleError(res, err, 'Failed to update document');
	}
});



// --+--+-- DELETE ENDPOINTS --+--+--

// DELETE Endpoint - Delete a Company
app.delete('/companies/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const result = await pool.query('DELETE FROM companies WHERE id = $1', [id]);
		if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Company not found' });
		res.status(200).json({ success: true, message: 'Company deleted successfully' });
	} catch (err) {
		handleError(res, err);
	}
});


// DELETE Endpoint - Delete a Product
app.delete('/products/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const result = await pool.query('DELETE FROM products WHERE product_id = $1', [id]);
		if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Product not found' });
		res.status(200).json({ success: true, message: 'Product deleted successfully' });
	} catch (err) {
		handleError(res, err);
	}
});

// DELETE Endpoint - Remove a single competitor from a product
app.delete('/products/:product_id/competitors/:competitor_id', async (req, res) => {
	const { product_id, competitor_id } = req.params;
	try {
		await removeRelationship('product_competitors', 'product_id', 'competitor_company_id', product_id, competitor_id);
		res.status(200).json({ success: true, message: 'Competitor removed from product successfully' });
	} catch (err) {
		handleError(res, err);
	}
});


// DELETE Endpoint - Delete a Persona
app.delete('/personas/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const result = await pool.query('DELETE FROM personas WHERE persona_id = $1', [id]);
		if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Persona not found' });
		res.status(200).json({ success: true, message: 'Persona deleted successfully' });
	} catch (err) {
		handleError(res, err);
	}
});


// DELETE Endpoint - Remove a single product from a persona
app.delete('/personas/:persona_id/products/:product_id', async (req, res) => {
	const { persona_id, product_id } = req.params;
	try {
		await removeRelationship('persona_products', 'persona_id', 'product_id', persona_id, product_id);
		res.status(200).json({ success: true, message: 'Product removed from persona successfully' });
	} catch (err) {
		handleError(res, err);
	}
});


// DELETE Endpoint - Delete a Document
app.delete('/documents/:document_id', async (req, res) => {
	const { document_id } = req.params;
	try {
		const result = await pool.query('DELETE FROM documents WHERE document_id = $1', [document_id]);
		if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Document not found' });
		res.status(200).json({ success: true, message: 'Document deleted successfully' });
	} catch (err) {
		handleError(res, err);
	}
});


// DELETE Endpoint - Remove a company from a document
app.delete('/documents/:document_id/companies/:company_id', async (req, res) => {
	const { document_id, company_id } = req.params;
	try {
		await removeRelationship('company_documents', 'document_id', 'company_id', document_id, company_id);
		res.status(200).json({ success: true, message: 'Company removed from document successfully' });
	} catch (err) {
		handleError(res, err);
	}
});

