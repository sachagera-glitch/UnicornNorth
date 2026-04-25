import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT hq_cma, COUNT(*) FROM unicorns GROUP BY hq_cma");
    console.log("Total counts by CMA from unicorns table:");
    console.log(JSON.stringify(res.rows, null, 2));
    
    const res2 = await client.query("SELECT hq_cma, COUNT(*) FROM unicorns WHERE first_unicorn_decade = '2020s' GROUP BY hq_cma");
    console.log("\n2020s counts by CMA from unicorns table:");
    console.log(JSON.stringify(res2.rows, null, 2));
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
