import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  const client = await pool.connect();
  console.log("🦄 Seeding refreshed UnicornNorth database...");

  try {
    await client.query("BEGIN");

    // Clear existing data
    await client.query("DELETE FROM companies_on_cusp");
    await client.query("DELETE FROM cma_decade_stats");
    await client.query("DELETE FROM unicorns");

    // ── Unicorns (101 companies from refreshed dataset) ──────────────────
    const unicorns = [
      // Name, HQ/CMA, Industry, Decade, Peak Val ($B), Status, Revenue Multiplier
      ["Nortel / BNR", "Ottawa-Gatineau", "Telecom", "1990s", 768.6, "Defunct", false],
      ["JDS Uniphase (JDSU)", "Ottawa-Gatineau", "Telecom", "1990s", 314.5, "Acquired", false],
      ["Shopify", "Ottawa-Gatineau", "E-commerce", "2010s", 300.0, "Public", false],
      ["BlackBerry (RIM)", "Kitchener-C-W", "Mobile", "1990s", 130.0, "Public", false],
      ["Constellation Software", "Toronto", "Software", "2010s", 112.0, "Public", false],
      ["Celestica", "Toronto", "Hardware", "1990s", 50.0, "Public", false],
      ["CGI Inc.", "Montréal", "IT Consulting", "1990s", 37.5, "Public", false],
      ["360networks", "Vancouver", "Telecom", "1990s", 36.0, "Defunct", false],
      ["Digital Equipment (Canada)", "Ottawa-Gatineau", "Hardware", "1990s", 25.0, "Acquired", false],
      ["Newbridge Networks", "Ottawa-Gatineau", "Telecom", "1990s", 21.8, "Acquired", false],
      ["Lightspeed Commerce", "Montréal", "POS Software", "2010s", 21.0, "Public", false],
      ["Nuvei", "Montréal", "Fintech", "2020s", 21.0, "Private (Advent)", false],
      ["OpenText", "Kitchener-C-W", "Software", "2000s", 18.0, "Public", false],
      ["AbCellera Biologics", "Vancouver", "Biotech", "2020s", 15.7, "Public (declined)", false],
      ["ATI Technologies", "Toronto", "Semiconductors", "1990s", 12.6, "Acquired", false],
      ["Dapper Labs", "Vancouver", "Web3", "2020s", 11.2, "Private", false],
      ["Cognos", "Ottawa-Gatineau", "BI Software", "1990s", 10.7, "Acquired", false],
      ["Telesat", "Ottawa-Gatineau", "Satellite Tech", "1990s", 10.3, "Public", false],
      ["1Password", "Toronto", "Cybersecurity", "2020s", 10.3, "Private", false],
      ["Telus International (TIXT)", "Vancouver", "Tech Services", "2020s", 10.0, "Public", false],
      ["Cohere", "Toronto", "AI", "2020s", 9.5, "Private", false],
      ["Hopper", "Montréal", "Travel Tech", "2020s", 7.4, "Private", false],
      ["Kinaxis", "Ottawa-Gatineau", "Supply Chain", "2010s", 6.8, "Public", false],
      ["Corel (Alludo)", "Ottawa-Gatineau", "Software", "1990s", 6.6, "Private", false],
      ["PointClickCare", "Toronto", "Healthtech", "2020s", 5.9, "Private", false],
      ["Wealthsimple", "Toronto", "Fintech", "2020s", 5.0, "Private", false],
      ["SSENSE", "Montréal", "E-commerce", "2020s", 5.0, "Creditor Protection", false],
      ["Xanadu", "Toronto", "Quantum", "2020s", 5.0, "Private", false],
      ["Geotab", "Toronto", "Telematics", "2020s", 5.0, "Self-Funded", false],
      ["LayerZero Labs", "Vancouver", "Web3", "2020s", 4.5, "Private", false],
      ["Blockstream", "Montréal", "Web3", "2020s", 4.5, "Private", false],
      ["Clio", "Vancouver", "Legal Tech", "2020s", 4.3, "Private", false],
      ["Waabi", "Toronto", "AI", "2020s", 4.2, "Private", false],
      ["Verafin", "St. John's", "Cyber/Fintech", "2020s", 4.1, "Acquired", false],
      ["ApplyBoard", "Kitchener-C-W", "Edtech", "2020s", 4.0, "Private", false],
      ["Alludo", "Ottawa-Gatineau", "Productivity", "2020s", 4.0, "PE-Owned", false],
      ["MDA Space", "Toronto", "Space Tech", "2020s", 4.0, "Public", false],
      ["Tenstorrent", "Toronto", "AI Hardware", "2020s", 3.8, "Private", false],
      ["Mitel", "Ottawa-Gatineau", "Telecom", "2010s", 3.7, "Private (post-Ch. 11)", false],
      ["MDB", "Ottawa-Gatineau", "Life Sciences", "2020s", 3.7, "Active", false],
      ["Entrust", "Ottawa-Gatineau", "Cybersecurity", "2020s", 3.7, "Acquired", false],
      ["Fullscript", "Ottawa-Gatineau", "Digital Health", "2020s", 3.7, "Private", false],
      ["StackAdapt", "Toronto", "Adtech", "2020s", 3.7, "Private", false],
      ["N-able", "Ottawa-Gatineau", "IT Software", "2020s", 3.1, "Public", false],
      ["Docebo", "Toronto", "Edtech/LMS", "2020s", 3.0, "Public", false],
      ["Caseware", "Toronto", "Audit/Tax", "2020s", 3.0, "PE-Owned", false],
      ["Meropost", "Toronto", "SaaS", "2020s", 3.0, "Private", false],
      ["Valsoft Corp", "Montréal", "Vertical SaaS", "2020s", 2.9, "Private", false],
      ["Plusgrade", "Montréal", "Ancillary Rev", "2020s", 2.9, "Private", false],
      ["Clearco", "Toronto", "Fintech", "2020s", 2.9, "Private (Restructured)", false],
      ["BHL Systemhouse", "Ottawa-Gatineau", "IT Services", "1990s", 2.7, "Acquired", false],
      ["Dye & Durham", "Toronto", "Legal Tech SaaS", "2020s", 2.7, "Public (declined)", false],
      ["Article", "Vancouver", "D2C Furniture", "2020s", 2.5, "Private", false],
      ["FGF Brands", "Toronto", "Food Tech", "2020s", 2.3, "Private", false],
      ["Tailscale", "Toronto", "Cybersecurity", "2020s", 2.2, "Private", false],
      ["Ross Video", "Ottawa-Gatineau", "Broadcast", "2020s", 2.2, "Self-Funded", false],
      ["Trulioo", "Vancouver", "Identity", "2020s", 2.1, "Private", false],
      ["WiLAN", "Ottawa-Gatineau", "Telecom/IP", "2000s", 2.1, "Public", false],
      ["Cority", "Toronto", "EHSQ", "2020s", 2.0, "PE-Owned", false],
      ["Global Relay", "Vancouver", "Compliance", "2020s", 2.0, "Self-Funded", false],
      ["Jobber", "Edmonton", "Home Services", "2020s", 2.0, "Private", false],
      ["Nexii", "Vancouver", "Cleantech", "2020s", 2.0, "Defunct/Acquired", false],
      ["Paper Education", "Montréal", "Edtech", "2020s", 2.0, "Private (restructured)", false],
      ["Converge Technology Solutions", "Toronto", "IT Services", "2020s", 2.0, "Public", false],
      ["Magnet Forensics", "Kitchener-C-W", "Cybersecurity", "2020s", 1.9, "Acquired", false],
      ["Assent", "Ottawa-Gatineau", "SaaS", "2020s", 1.8, "Private", false],
      ["Jane Software", "Vancouver", "Healthtech", "2020s", 1.8, "Private", false],
      ["Zarlink", "Ottawa-Gatineau", "Semiconductors", "1990s", 1.8, "Acquired", false],
      ["Thinkific", "Vancouver", "Edtech", "2020s", 1.8, "Public", false],
      ["Ada", "Toronto", "AI", "2020s", 1.7, "Private", false],
      ["Hummingbird", "Ottawa-Gatineau", "Software", "1990s", 1.5, "Acquired", false],
      ["eSentire", "Kitchener-C-W", "Cybersecurity", "2020s", 1.5, "Private", false],
      ["Hootsuite", "Vancouver", "Martech", "2010s", 1.5, "Private", false],
      ["Kik", "Kitchener-C-W", "Social/Web3", "2010s", 1.5, "Defunct/Acquired US", false],
      ["Prophix", "Toronto", "Finance SaaS", "2020s", 1.5, "PE-Owned", false],
      ["BlueCat Networks", "Toronto", "DDI SaaS", "2020s", 1.5, "PE-Owned", false],
      ["SOTI", "Toronto", "Mobility", "2020s", 1.5, "PE-Owned", false],
      ["Semios", "Vancouver", "Agtech", "2020s", 1.4, "Private", false],
      ["Svante", "Vancouver", "Cleantech", "2020s", 1.4, "Private", false],
      ["Visier", "Vancouver", "HR Tech", "2020s", 1.4, "Private", false],
      ["FreshBooks", "Toronto", "SaaS", "2020s", 1.4, "Private", false],
      ["Benevity", "Calgary", "SaaS", "2020s", 1.4, "Private", false],
      ["Axelar", "Toronto", "Web3", "2020s", 1.4, "Private", false],
      ["Neo Financial", "Calgary", "Fintech", "2020s", 1.4, "Private", false],
      ["Coveo", "Québec City", "AI/Search", "2010s", 1.4, "Public", false],
      ["Vena Solutions", "Toronto", "Finance SaaS", "2020s", 1.4, "Private", false],
      ["Vention", "Montréal", "Industrial AI", "2020s", 1.4, "Private", false],
      ["UniUni", "Vancouver", "Logistics", "2020s", 1.4, "Private", false],
      ["Koho Financial", "Toronto", "Challenger Bank", "2020s", 1.3, "Private", false],
      ["Dragonwave", "Ottawa-Gatineau", "Telecom", "2000s", 1.2, "Defunct", false],
      ["GaN Systems", "Ottawa-Gatineau", "Semiconductors", "2020s", 1.1, "Acquired", false],
      ["League", "Toronto", "Healthtech", "2020s", 1.2, "Private", false],
      ["WELL Health", "Vancouver", "Healthtech", "2020s", 1.1, "Public", false],
      ["Prodigy Education", "Hamilton", "Edtech", "2020s", 1.1, "Private", false],
      ["TouchBistro", "Toronto", "POS Software", "2020s", 1.1, "Private", false],
      ["GeoComply", "Vancouver", "Identity/Risk", "2020s", 1.0, "Private", false],
      ["Figment", "Toronto", "Web3", "2020s", 1.0, "Private", false],
      ["LeddarTech", "Québec City", "Auto Tech", "2020s", 1.0, "Public", false],
      ["Banyon Software", "Toronto", "Vertical SaaS", "2020s", 1.0, "HoldCo", false],
      ["Farmers Edge", "Winnipeg", "AgTech", "2020s", 1.0, "Delisted", false],
      ["Copperleaf Technologies", "Vancouver", "Enterprise SW", "2020s", 1.0, "Acquired (IFS)", false],
    ];

    for (const u of unicorns) {
      await client.query(
        `INSERT INTO unicorns (company_name, hq_cma, industry, first_unicorn_decade, peak_valuation_cad_2025, company_status, is_revenue_multiplier)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        u
      );
    }
    console.log(`✅ Seeded ${unicorns.length} unicorns`);

    // ── CMA Decade Stats ───────────────────────────────────────────────
    // Using 2020s as the primary decade for intensity visualization
    const cmaStats = [
      // Ottawa-Gatineau
      ["Ottawa-Gatineau", "1990s", 10, 12.50],
      ["Ottawa-Gatineau", "2000s", 12, 12.00],
      ["Ottawa-Gatineau", "2010s", 15, 12.50],
      ["Ottawa-Gatineau", "2020s", 23, 15.46],

      // Toronto
      ["Toronto", "1990s", 2, 0.50],
      ["Toronto", "2000s", 2, 0.40],
      ["Toronto", "2010s", 3, 0.55],
      ["Toronto", "2020s", 34, 5.48],

      // Vancouver
      ["Vancouver", "1990s", 1, 0.63],
      ["Vancouver", "2000s", 1, 0.50],
      ["Vancouver", "2010s", 2, 0.87],
      ["Vancouver", "2020s", 20, 7.57],

      // Kitchener-C-W
      ["Kitchener-C-W", "1990s", 1, 2.85],
      ["Kitchener-C-W", "2000s", 2, 4.76],
      ["Kitchener-C-W", "2010s", 4, 8.33],
      ["Kitchener-C-W", "2020s", 6, 10.42],

      // Montréal
      ["Montréal", "1990s", 1, 0.31],
      ["Montréal", "2000s", 1, 0.28],
      ["Montréal", "2010s", 2, 0.51],
      ["Montréal", "2020s", 10, 2.33],

      // St. John's
      ["St. John's", "2020s", 1, 4.69],

      // Others (placeholders for 2020s)
      ["Calgary", "2020s", 2, 1.35],
      ["Québec City", "2020s", 2, 2.38],
      ["Edmonton", "2020s", 1, 0.71],
      ["Hamilton", "2020s", 1, 1.27],
      ["Winnipeg", "2020s", 1, 1.20],
    ];

    for (const s of cmaStats) {
      await client.query(
        `INSERT INTO cma_decade_stats (cma, decade, unicorn_count, unicorns_per_million_res)
         VALUES ($1, $2, $3, $4)`,
        s
      );
    }
    console.log(`✅ Seeded ${cmaStats.length} CMA decade stats`);

    // ── Companies On The Cusp (Preserving or placeholder) ──────────────
    const onCusp = [
      ["Solink", "Ottawa-Gatineau", "Deep-Tech"],
      ["Solace", "Ottawa-Gatineau", "Deep-Tech"],
      ["Turbopuffer", "Ottawa-Gatineau", "Deep-Tech"],
      ["Mindbridge.ai", "Ottawa-Gatineau", "Deep-Tech"],
      ["Subterra", "Toronto", "CleanTech"],
      ["Salt XC", "Toronto", "MarTech"],
      ["Vena Solutions", "Toronto", "SaaS"],
      ["Ecopia AI", "Toronto", "AI"],
      ["Klue", "Vancouver", "SaaS"],
      ["AlayaCare", "Montréal", "HealthTech"],
      ["Vendasta", "Saskatoon", "SaaS"],
      ["Vidyard", "Kitchener-C-W", "MarTech"],
    ];

    for (const c of onCusp) {
      await client.query(
        `INSERT INTO companies_on_cusp (company_name, hq_cma, sector_focus)
         VALUES ($1, $2, $3)`,
        c
      );
    }
    console.log(`✅ Seeded ${onCusp.length} companies on the cusp`);

    await client.query("COMMIT");
    console.log("🎉 UnicornNorth database refreshed with updated 2025 dataset!");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
