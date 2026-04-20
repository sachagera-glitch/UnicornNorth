require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log(res.rows);
    
    for (const row of res.rows) {
      const columns = await client.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${row.table_name}'`);
      console.log(`Table: ${row.table_name}`, columns.rows.map(c => c.column_name));
    }
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
