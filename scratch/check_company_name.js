const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function check() {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "SELECT company_name FROM unicorns WHERE company_name LIKE '%Systemhouse%'"
    );
    console.log('Current Systemhouse entries:', res.rows);
  } catch (err) {
    console.error('Error checking database:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

check();
