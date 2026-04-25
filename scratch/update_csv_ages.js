import fs from 'fs';

const csvPath = 'c:/Users/sacha.gera/Downloads/UnicornNorth/unicorns_v7.csv';
const content = fs.readFileSync(csvPath, 'utf8');
const lines = content.split('\n');
const header = lines[0];

const updatedLines = [header];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  
  // Regex to handle quoted founders field
  // id,company_name,founded_year,company_age_years,age_basis,hq_cma,industry,first_unicorn_decade,peak_valuation_cad_2025,company_status,is_revenue_multiplier,last_updated,founders,acquirer_region
  const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  
  if (parts.length >= 4) {
    const foundedYear = parseInt(parts[2]);
    if (!isNaN(foundedYear)) {
      const foundedAge = 2026 - foundedYear;
      parts[3] = foundedAge.toString();
      
      // Update age_basis if it was "Capped at..."
      if (parts[4].includes('Capped at')) {
        parts[4] = parts[4].replace(/Capped at \d+:/, 'Active (uncapped):');
      } else {
        parts[4] = "Active: age uses current year (2026)";
      }
    }
  }
  updatedLines.push(parts.join(','));
}

fs.writeFileSync(csvPath, updatedLines.join('\n'));
console.log("Updated unicorns_v7.csv with founded ages");
