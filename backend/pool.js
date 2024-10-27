const { Pool } = require("pg");

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'fullstack_db',
	password: '2524',
	frontend: 'http://localhost:3001',
	port: 5432,
});
exports.pool = pool;
