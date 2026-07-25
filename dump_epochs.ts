import "dotenv/config";
import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as fs from "fs";
import * as path from "path";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const SECTOR_MAPPING: Record<string, string> = {
  "Telecom": "Telecom",
  "Mobile": "Telecom",
  "Telecom/IP": "Telecom",
  "Satellite Tech": "Telecom",
  "Tech Services": "Telecom",
  "E-commerce": "Ecommerce",
  "POS Software": "Ecommerce",
  "SaaS": "Ecommerce",
  "Travel Tech": "Ecommerce",
  "Supply Chain": "Ecommerce",
  "Legal Tech": "Ecommerce",
  "Legal Tech SaaS": "Ecommerce",
  "Vertical SaaS": "Ecommerce",
  "Finance SaaS": "Ecommerce",
  "D2C Furniture": "Ecommerce",
  "Home Services": "Ecommerce",
  "Martech": "Ecommerce",
  "Ancillary Rev": "Ecommerce",
  "Adtech": "Ecommerce",
  "Software": "Software",
  "IT Consulting": "Software",
  "IT Services": "Software",
  "Edtech": "Software",
  "Edtech/LMS": "Software",
  "Cybersecurity": "Cybersecurity",
  "Identity/Risk": "Cybersecurity",
  "BI Software": "Software",
  "IT Software": "Software",
  "Audit/Tax": "Software",
  "Identity": "Software",
  "Compliance": "Software",
  "EHSQ": "Software",
  "DDI SaaS": "Software",
  "Mobility": "Software",
  "HR Tech": "Software",
  "Enterprise SW": "Software",
  "Hardware": "Hardware",
  "Semiconductors": "Hardware",
  "Broadcast": "Hardware",
  "Auto Tech": "Hardware",
  "Telematics": "Hardware",
  "Space Tech": "Hardware",
  "Quantum": "Quantum",
  "AI": "AI",
  "AI Hardware": "AI",
  "Industrial AI": "AI",
  "AI/Search": "AI",
  "Web3": "Web3",
  "Social/Web3": "Web3",
  "Fintech": "Fintech",
  "Challenger Bank": "Fintech",
  "Cleantech": "Clean",
  "Agtech": "Clean",
  "AgTech": "Clean",
};

const SECTORS = [
  "Telecom",
  "Ecommerce",
  "Software",
  "Hardware",
  "Cybersecurity",
  "AI",
  "Web3",
  "Fintech",
  "Quantum",
  "Other"
];

const YEARS = [
  1990, 1995, 1998, 2000, 2002, 2005, 2008, 2010, 2013, 2015, 2017, 2019, 2020, 2021, 2023, 2025, 2026
];

async function main() {
  const unicorns = await prisma.unicorn.findMany();
  console.log(`Fetched ${unicorns.length} unicorns from database.`);

  const epochData = YEARS.map(year => {
    const dataPoint: any = { year: year };
    
    // Initialize buckets
    SECTORS.forEach(sec => dataPoint[sec] = 0);

    unicorns.forEach(u => {
      const sector = SECTOR_MAPPING[u.industry || ""] || "Other";
      const peakVal = parseFloat(u.peakValuationCad2025?.toString() || "0");
      const founded = u.foundedYear || 1990;
      
      let currentContrib = 0;

      if (sector === "Telecom") {
        // Legacy Telecom Bubble Logic
        if (year <= 2000) {
          // Ramp up to peak in 2000
          const ramp = Math.max(0, (year - founded) / (2000 - founded + 1));
          currentContrib = peakVal * Math.min(1, ramp);
        } else {
          // Exponential decay after 2000
          const yearsSincePeak = year - 2000;
          const decay = Math.pow(0.5, yearsSincePeak / 2); // Half every 2 years
          currentContrib = peakVal * decay;
        }
      } else {
        // Modern Sector Logic
        // Ramp up from founded to peak (assuming peak is near now/2025)
        const peakYear = 2025;
        if (year < founded) {
          currentContrib = 0;
        } else if (year <= peakYear) {
          const ramp = (year - founded) / (peakYear - founded + 1);
          currentContrib = peakVal * ramp;
        } else {
          // Stable after peak
          currentContrib = peakVal;
        }
      }

      dataPoint[sector] += currentContrib;
    });

    // Round for cleaner chart - matching ValueEpochs.tsx exactly (Math.round)
    SECTORS.forEach(sec => {
      dataPoint[sec] = Math.round(dataPoint[sec]);
    });

    return dataPoint;
  });

  // Now format as CSV
  // Header: Year, Telecom, Ecommerce, Software, Hardware, Cybersecurity, AI, Web3, Fintech, Quantum, Other, Total
  const headers = ["Year", ...SECTORS, "Total"];
  const csvRows = [headers.join(",")];

  epochData.forEach(row => {
    const vals = SECTORS.map(sec => row[sec]);
    const total = vals.reduce((sum, v) => sum + v, 0);
    csvRows.push([row.year, ...vals, total].join(","));
  });

  const csvContent = csvRows.join("\r\n");
  const outputPath = path.join(__dirname, "..", "value_epochs_by_sector_year.csv");
  fs.writeFileSync(outputPath, csvContent, "utf8");
  console.log(`Successfully wrote CSV to ${outputPath}`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
