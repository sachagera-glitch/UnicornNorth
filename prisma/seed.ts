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
    await client.query("DELETE FROM cma_metadata");
    await client.query("DELETE FROM companies_on_cusp");
    await client.query("DELETE FROM cma_decade_stats");
    await client.query("DELETE FROM unicorns");

    // ── Unicorns (100 companies - Alludo merged into Corel) ──────────────
    const unicorns = [
      // Name, HQ/CMA, Industry, Founders, Decade, Peak Val ($B), Status, Revenue Multiplier, Acquirer Region
      ["Nortel / BNR", "Ottawa-Gatineau", "Telecom", "N/A", "1990s", 768.6, "Defunct", false, null],
      ["JDS Uniphase (JDSU)", "Ottawa-Gatineau", "Telecom", "Jozef Straus; Kevin Kalkhoven", "1990s", 295.0, "Acquired", false, "US"],
      ["Shopify", "Ottawa-Gatineau", "E-commerce", "Tobias Lütke, Daniel Weinand, Scott Lake", "2010s", 300.0, "Public", false, null],
      ["BlackBerry (RIM)", "Kitchener-C-W", "Mobile", "Mike Lazaridis, Douglas Fregin", "1990s", 130.0, "Public", false, null],
      ["Constellation Software", "Toronto", "Software", "Mark Leonard", "2010s", 112.0, "Public", false, null],
      ["Celestica", "Toronto", "Hardware", "Eugene Polistuk", "1990s", 50.0, "Public", false, null],
      ["CGI Inc.", "Montréal", "IT Consulting", "Serge Godin, André Imbeau", "1990s", 37.5, "Public", false, null],
      ["360networks", "Vancouver", "Telecom", "Greg Maffei, Ledcor Group", "1990s", 36.0, "Defunct", false, null],
      ["Digital Equipment (Canada)", "Ottawa-Gatineau", "Hardware", "Ken Olsen (US parent)", "1990s", 25.0, "Acquired", false, "US"],
      ["Newbridge Networks", "Ottawa-Gatineau", "Telecom", "Terry Matthews", "1990s", 21.8, "Acquired", false, "European"],
      ["Lightspeed Commerce", "Montréal", "POS Software", "Dax Dasilva", "2010s", 21.0, "Public", false, null],
      ["Nuvei", "Montréal", "Fintech", "Philip Fayer", "2020s", 21.0, "Private (Advent)", false, null],
      ["OpenText", "Kitchener-C-W", "Software", "Tim Bray, Gaston Gonnet", "2000s", 18.0, "Public", false, null],
      ["AbCellera Biologics", "Vancouver", "Biotech", "Carl Hansen", "2020s", 15.7, "Public (declined)", false, null],
      ["ATI Technologies", "Toronto", "Semiconductors", "Lee Ka Lau et al.", "1990s", 12.6, "Acquired", false, "US"],
      ["Dapper Labs", "Vancouver", "Web3", "Roham Gharegozlou et al.", "2020s", 11.2, "Private", false, null],
      ["Cognos", "Ottawa-Gatineau", "BI Software", "Michael Potter, Alan Guedes", "1990s", 10.7, "Acquired", false, "US"],
      ["Telesat", "Ottawa-Gatineau", "Satellite Tech", "Govt. of Canada (privatized)", "1990s", 10.3, "Public", false, null],
      ["1Password", "Toronto", "Cybersecurity", "Dave Teare, Roustem Karimov", "2020s", 10.3, "Private", false, null],
      ["Telus International (TIXT)", "Vancouver", "Tech Services", "Darren Entwistle (Telus)", "2020s", 10.0, "Public", false, null],
      ["Cohere", "Toronto", "AI", "Aidan Gomez, Ivan Zhang, Nick Frosst", "2020s", 9.5, "Private", false, null],
      ["Hopper", "Montréal", "Travel Tech", "Frederic Lalonde", "2020s", 7.4, "Private", false, null],
      ["Kinaxis", "Ottawa-Gatineau", "Supply Chain", "Duncan Klett, Bob Ashe", "2010s", 6.8, "Public", false, null],
      ["Corel (Alludo)", "Ottawa-Gatineau", "Software", "Michael Cowpland", "1990s", 6.6, "Private", false, null],
      ["PointClickCare", "Toronto", "Healthtech", "Mike Oldfield, Dave Friesen", "2020s", 5.9, "Private", false, null],
      ["Wealthsimple", "Toronto", "Fintech", "Michael Katchen", "2020s", 5.0, "Private", false, null],
      ["SSENSE", "Montréal", "E-commerce", "Rami, Bassel, Firas Atallah", "2020s", 5.0, "Creditor Protection", false, null],
      ["Xanadu", "Toronto", "Quantum", "Christian Weedbrook", "2020s", 5.0, "Private", false, null],
      ["Geotab", "Toronto", "Telematics", "Neil Cawse", "2020s", 5.0, "Self-Funded", false, null],
      ["EXFO", "Québec City", "Telecom", "Germain Lamonde", "2020s", 4.8, "Private (Lamonde)", false, null],
      ["LayerZero Labs", "Vancouver", "Web3", "Bryan Pellegrino et al.", "2020s", 4.5, "Private", false, null],
      ["Blockstream", "Montréal", "Web3", "Adam Back et al.", "2020s", 4.5, "Private", false, null],
      ["Clio", "Vancouver", "Legal Tech", "Jack Newton, Rian Gauvreau", "2020s", 4.3, "Private", false, null],
      ["Waabi", "Toronto", "AI", "Raquel Urtasun", "2020s", 4.2, "Private", false, null],
      ["Verafin", "St. John's", "Cyber/Fintech", "Jamie King, Raymond Pretty", "2020s", 4.1, "Acquired", false, "US"],
      ["ApplyBoard", "Kitchener-C-W", "Edtech", "Martin, Meti & Massi Basiri", "2020s", 4.0, "Private", false, null],
      ["MDA Space", "Toronto", "Space Tech", "John S. MacDonald", "2020s", 4.0, "Public", false, null],
      ["Tenstorrent", "Toronto", "AI Hardware", "Ljubisa Bajic", "2020s", 3.8, "Private", false, null],
      ["Mitel", "Ottawa-Gatineau", "Telecom", "Terry Matthews, Michael Cowpland", "2010s", 3.7, "Private (post-Ch. 11)", false, null],
      ["Entrust", "Ottawa-Gatineau", "Cybersecurity", "Nortel spin-off", "2020s", 3.7, "Acquired", false, "US"],
      ["Fullscript", "Ottawa-Gatineau", "Digital Health", "Kyle Gustainis, Adam Landau", "2020s", 3.7, "Private", false, null],
      ["StackAdapt", "Toronto", "Adtech", "Vitaly Pecherskiy et al.", "2020s", 3.7, "Private", false, null],
      ["N-able", "Ottawa-Gatineau", "IT Software", "SolarWinds spin-off", "2020s", 3.1, "Public", false, null],
      ["Docebo", "Toronto", "Edtech/LMS", "Claudio Erba", "2020s", 3.0, "Public", false, null],
      ["Caseware", "Toronto", "Audit/Tax", "David Bray", "2020s", 3.0, "PE-Owned", false, null],
      ["Meropost", "Toronto", "SaaS", "Ross Andrew Fler", "2020s", 3.0, "Private", false, null],
      ["Valsoft Corp", "Montréal", "Vertical SaaS", "Sam Youssef", "2020s", 2.9, "Private", false, null],
      ["Plusgrade", "Montréal", "Ancillary Rev", "Ken Harris", "2020s", 2.9, "Private", false, null],
      ["Clearco", "Toronto", "Fintech", "Andrew D’Souza, Michele Romanow", "2020s", 2.9, "Private (Restructured)", false, null],
      ["SHL Systemhouse", "Ottawa-Gatineau", "IT Services", "Rod Bryden", "1990s", 2.7, "Acquired", false, "US"],
      ["Dye & Durham", "Toronto", "Legal Tech SaaS", "Matthew Baer", "2020s", 2.7, "Public (declined)", false, null],
      ["Article", "Vancouver", "D2C Furniture", "Aamir Baig, Andy Prochazka", "2020s", 2.5, "Private", false, null],
      ["FGF Brands", "Toronto", "Food Tech", "Anthony Guido", "2020s", 2.3, "Private", false, null],
      ["Tailscale", "Toronto", "Cybersecurity", "Avery Pennarun et al.", "2020s", 2.2, "Private", false, null],
      ["Ross Video", "Ottawa-Gatineau", "Broadcast", "John Ross", "2020s", 2.2, "Self-Funded", false, null],
      ["Trulioo", "Vancouver", "Identity", "Stephen Ufford, Tanis Jorge", "2020s", 2.1, "Private", false, null],
      ["WiLAN", "Ottawa-Gatineau", "Telecom/IP", "Michel Guité", "2000s", 2.1, "Public", false, null],
      ["Cority", "Toronto", "EHSQ", "Mark Wallace", "2020s", 2.0, "PE-Owned", false, null],
      ["Global Relay", "Vancouver", "Compliance", "Warren Roy", "2020s", 2.0, "Self-Funded", false, null],
      ["Jobber", "Edmonton", "Home Services", "Sam Pillar, Forrest Rzenznick", "2020s", 2.0, "Private", false, null],
      ["Nexii", "Vancouver", "Cleantech", "Stephen Sidwell", "2020s", 2.0, "Defunct/Acquired", false, "Canadian"],
      ["Paper Education", "Montréal", "Edtech", "Philip Cutler", "2020s", 2.0, "Private (restructured)", false, null],
      ["Converge Technology Solutions", "Toronto", "IT Services", "Shaun Maine", "2020s", 2.0, "Public", false, null],
      ["Magnet Forensics", "Kitchener-C-W", "Cybersecurity", "Jad Saliba, Adam Belsher", "2020s", 1.9, "Acquired", false, "US"],
      ["Assent", "Ottawa-Gatineau", "SaaS", "Andrew Waitman", "2020s", 1.8, "Private", false, null],
      ["Jane Software", "Vancouver", "Healthtech", "Trevor Johnston, Alison Taylor", "2020s", 1.8, "Private", false, null],
      ["Zarlink", "Ottawa-Gatineau", "Semiconductors", "David Smith", "1990s", 1.8, "Acquired", false, "US"],
      ["Thinkific", "Vancouver", "Edtech", "Greg Smith, Matt Smith", "2020s", 1.8, "Public", false, null],
      ["Ada", "Toronto", "AI", "Mike Murchison, David Baxter", "2020s", 1.7, "Private", false, null],
      ["Fulcrum (Hummingbird)", "Ottawa-Gatineau", "Software", "Fred Hooper", "1990s", 1.5, "Acquired", false, "Canadian"],
      ["eSentire", "Kitchener-C-W", "Cybersecurity", "Eldon Sprickerhoff", "2020s", 1.5, "Private", false, null],
      ["Hootsuite", "Vancouver", "Martech", "Ryan Holmes", "2010s", 1.5, "Private", false, null],
      ["Kik", "Kitchener-C-W", "Social/Web3", "Ted Livingston", "2010s", 1.5, "Defunct/Acquired US", false, "US"],
      ["Prophix", "Toronto", "Finance SaaS", "John Catte, Paul Cainey", "2020s", 1.5, "PE-Owned", false, null],
      ["BlueCat Networks", "Toronto", "DDI SaaS", "Michael Hyatt, Richard Hyatt", "2020s", 1.5, "PE-Owned", false, null],
      ["SOTI", "Toronto", "Mobility", "Carl Rodrigues", "2020s", 1.5, "PE-Owned", false, null],
      ["Semios", "Vancouver", "Agtech", "Michael Gilbert", "2020s", 1.4, "Private", false, null],
      ["Svante", "Vancouver", "Cleantech", "Claude Letourneau", "2020s", 1.4, "Private", false, null],
      ["Visier", "Vancouver", "HR Tech", "Ryan Wong, John Schwarz", "2020s", 1.4, "Private", false, null],
      ["FreshBooks", "Toronto", "SaaS", "Mike McDerment", "2020s", 1.4, "Private", false, null],
      ["Benevity", "Calgary", "SaaS", "Bryan de Lottinville", "2020s", 1.4, "Private", false, null],
      ["Axelar", "Toronto", "Web3", "Sergey Gorbunov, Georgios Vlachos", "2020s", 1.4, "Private", false, null],
      ["Neo Financial", "Calgary", "Fintech", "Andrew Chau, Jeff MacPherson", "2020s", 1.4, "Private", false, null],
      ["Coveo", "Québec City", "AI/Search", "Laurent Simoneau, Richard Tessier", "2010s", 1.4, "Public", false, null],
      ["Vena Solutions", "Toronto", "Finance SaaS", "Don Picard, Rishi Grover", "2020s", 1.4, "Private", false, null],
      ["Vention", "Montréal", "Industrial AI", "Etienne Lacroix, Max Windisch", "2020s", 1.4, "Private", false, null],
      ["UniUni", "Vancouver", "Logistics", "Leo Li", "2020s", 1.4, "Private", false, null],
      ["Koho Financial", "Toronto", "Challenger Bank", "Daniel Eberhard", "2020s", 1.3, "Private", false, null],
      ["Dragonwave", "Ottawa-Gatineau", "Telecom", "Jean-Paul Baric", "2000s", 1.2, "Defunct", false, null],
      ["GaN Systems", "Ottawa-Gatineau", "Semiconductors", "Girvan Patterson, John Roberts", "2020s", 1.1, "Acquired", false, "European"],
      ["League", "Toronto", "Healthtech", "Mike Serbinis", "2020s", 1.2, "Private", false, null],
      ["WELL Health", "Vancouver", "Healthtech", "Hamed Shahbazi", "2020s", 1.1, "Public", false, null],
      ["Prodigy Education", "Hamilton", "Edtech", "Rohan Mahimker, Alex Peters", "2020s", 1.1, "Private", false, null],
      ["TouchBistro", "Toronto", "POS Software", "Alex Barrotti", "2020s", 1.1, "Private", false, null],
      ["GeoComply", "Vancouver", "Identity/Risk", "Anna Googina, David Spooner", "2020s", 1.0, "Private", false, null],
      ["Figment", "Toronto", "Web3", "Lorien Gabel et al.", "2020s", 1.0, "Private", false, null],
      ["LeddarTech", "Québec City", "Auto Tech", "Yvon Provençal", "2020s", 1.0, "Public", false, null],
      ["Banyon Software", "Toronto", "Vertical SaaS", "David Fajardo", "2020s", 1.0, "HoldCo", false, null],
      ["Farmers Edge", "Winnipeg", "AgTech", "Wade Barnes", "2020s", 1.0, "Delisted", false, null],
      ["Copperleaf Technologies", "Vancouver", "Enterprise SW", "Judi Hess", "2020s", 1.0, "Acquired (IFS)", false, "European"],
    ];

    for (const u of unicorns) {
      await client.query(
        `INSERT INTO unicorns (company_name, hq_cma, industry, founders, first_unicorn_decade, peak_valuation_cad_2025, company_status, is_revenue_multiplier, acquirer_region)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
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
      ["Ottawa-Gatineau", "2020s", 21, 14.11],

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

    // ── CMA Metadata (Editorial descriptions for Tech Hubs) ──────────────
    const cmaMetadata = [
      ["Ottawa-Gatineau", "The Historical Titan", "Generated nearly 70% of all-time value."],
      ["Toronto", "Modern Growth Engine", "Dominates 2020s volume."],
      ["Kitchener-C-W", "Durable Platform Hub", "Built around lasting anchors."],
      ["Montréal", "High-Value Scale", "Fewer companies, but large average scale."],
      ["Vancouver", "Diverse Deep-Tech", "Strongest AgTech/CleanTech mix."],
      ["St. John's", "Fintech Outpost", "Home to Verafin."],
      ["Calgary", "Energy-Tech Hub", "Scaling Benevity and Neo Financial."],
      ["Québec City", "AI & Auto Hub", "Led by Coveo and LeddarTech."],
      ["Edmonton", "New Node Hub", "Crossed with Jobber."],
      ["Hamilton", "Edtech Expansion", "HQ for Prodigy Education."],
      ["Winnipeg", "Prairie AgTech", "Home to Farmers Edge."],
    ];

    for (const m of cmaMetadata) {
      await client.query(
        `INSERT INTO cma_metadata (cma, lens, description)
         VALUES ($1, $2, $3)`,
        m
      );
    }
    console.log(`✅ Seeded ${cmaMetadata.length} CMA metadata entries`);

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
