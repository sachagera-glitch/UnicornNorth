import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// founded_age = 2026 - founded_year (never capped)
const data = [
  ["Nortel / BNR", 1895],
  ["JDS Uniphase (JDSU)", 1981],
  ["Shopify", 2006],
  ["BlackBerry (RIM)", 1984],
  ["Constellation Software", 1995],
  ["Celestica", 1994],
  ["CGI Inc.", 1976],
  ["360networks", 1998],
  ["Digital Equipment (Canada)", 1963],
  ["Newbridge Networks", 1986],
  ["Lightspeed Commerce", 2005],
  ["Nuvei", 2003],
  ["OpenText", 1991],
  ["AbCellera Biologics", 2012],
  ["Xanadu", 2016],
  ["ATI Technologies", 1985],
  ["Hut 8 Corp", 2017],
  ["Dapper Labs", 2018],
  ["Cognos", 1969],
  ["Telesat", 1969],
  ["1Password", 2005],
  ["Telus International (TIXT)", 2005],
  ["Cohere", 2019],
  ["Hopper", 2007],
  ["Kinaxis", 1984],
  ["Corel (Alludo)", 1985],
  ["PointClickCare", 2000],
  ["Wealthsimple", 2014],
  ["SSENSE", 2003],
  ["Geotab", 2000],
  ["EXFO", 1985],
  ["LayerZero Labs", 2021],
  ["Blockstream", 2014],
  ["Clio", 2008],
  ["Waabi", 2021],
  ["Verafin", 2003],
  ["ApplyBoard", 2015],
  ["MDA Space", 1969],
  ["Tenstorrent", 2016],
  ["Mitel", 1973],
  ["Entrust", 1996],
  ["Fullscript", 2011],
  ["StackAdapt", 2013],
  ["N-able", 2000],
  ["Docebo", 2005],
  ["Caseware", 1988],
  ["Meropost", 2011],
  ["Valsoft Corp", 2015],
  ["Plusgrade", 2009],
  ["Clearco", 2015],
  ["SHL Systemhouse", 1974],
  ["Dye & Durham", 1874],
  ["Article", 2013],
  ["FGF Brands", 2004],
  ["Tailscale", 2019],
  ["Ross Video", 1974],
  ["Trulioo", 2011],
  ["WiLAN", 1992],
  ["Cority", 1985],
  ["Global Relay", 1999],
  ["Jobber", 2011],
  ["Nexii", 2019],
  ["Paper Education", 2014],
  ["Converge Technology Solutions", 2017],
  ["Magnet Forensics", 2011],
  ["Assent", 2010],
  ["Jane Software", 2012],
  ["Zarlink", 2001],
  ["Thinkific", 2012],
  ["Ada", 2016],
  ["Fulcrum (Hummingbird)", 1983],
  ["eSentire", 2001],
  ["Hootsuite", 2008],
  ["Kik", 2009],
  ["Prophix", 1987],
  ["BlueCat Networks", 2001],
  ["SOTI", 1995],
  ["Semios", 2010],
  ["Svante", 2007],
  ["Visier", 2010],
  ["FreshBooks", 2003],
  ["Benevity", 2008],
  ["Axelar", 2020],
  ["Neo Financial", 2019],
  ["Coveo", 2005],
  ["Vena Solutions", 2011],
  ["Vention", 2016],
  ["Koho Financial", 2014],
  ["Dragonwave", 2000],
  ["GaN Systems", 2008],
  ["League", 2014],
  ["WELL Health", 2010],
  ["Prodigy Education", 2011],
  ["TouchBistro", 2010],
  ["GeoComply", 2011],
  ["Figment", 2018],
  ["LeddarTech", 2007],
  ["Banyon Software", 2016],
  ["Farmers Edge", 2005],
  ["Copperleaf Technologies", 2000],
];

async function main() {
  const client = await pool.connect();
  console.log("🔧 Adding founded_year and founded_age columns...");
  try {
    await client.query("BEGIN");

    // Add columns if they don't exist
    await client.query(`
      ALTER TABLE unicorns
        ADD COLUMN IF NOT EXISTS founded_year INT,
        ADD COLUMN IF NOT EXISTS founded_age  INT
    `);
    console.log("✅ Columns added (or already existed)");

    // Update each company
    for (const [name, year] of data) {
      const age = 2026 - year;
      await client.query(
        `UPDATE unicorns SET founded_year = $1, founded_age = $2 WHERE company_name = $3`,
        [year, age, name]
      );
    }
    console.log(`✅ Updated ${data.length} companies`);

    await client.query("COMMIT");
    console.log("🎉 Migration complete!");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
