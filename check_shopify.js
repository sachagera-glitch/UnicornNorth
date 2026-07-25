require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT * FROM unicorns WHERE company_name ILIKE '%Shopify%'");
    console.log(JSON.stringify(res.rows, null, 2));
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
