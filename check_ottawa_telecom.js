require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  const client = await pool.connect();
  try {
    const res = await client.query(`
      SELECT company_name, peak_valuation_cad_2025 
      FROM unicorns 
      WHERE hq_cma = 'Ottawa-Gatineau' 
        AND industry = 'Telecom'
    `);
    console.log(res.rows);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
