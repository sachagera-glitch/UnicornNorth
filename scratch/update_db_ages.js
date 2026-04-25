import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  const client = await pool.connect();
  console.log("🔧 Updating company_age_years and age_basis in DB...");
  try {
    await client.query("BEGIN");

    // Update all unicorns to use uncapped age
    await client.query(`
      UPDATE unicorns 
      SET 
        company_age_years = 2026 - founded_year,
        age_basis = 'Active: age uses current year (2026)'
      WHERE founded_year IS NOT NULL
    `);

    await client.query("COMMIT");
    console.log("🎉 Database updated successfully!");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
