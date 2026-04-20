const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function update() {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "UPDATE unicorns SET company_name = 'SHL Systemhouse' WHERE company_name = 'BHL Systemhouse'"
    );
    console.log(`Successfully updated ${res.rowCount} row(s).`);
  } catch (err) {
    console.error('Error updating database:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

update();
