import fs from 'fs';

const csvPath = 'c:/Users/sacha.gera/Downloads/UnicornNorth/unicorns_v7.csv';
const content = fs.readFileSync(csvPath, 'utf8');
const lines = content.split('\n');

const unicorns = [];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  
  // Regex to handle quoted founders field
  const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  
  if (parts.length >= 14) {
    const name = parts[1];
    const foundedYear = parseInt(parts[2]);
    const age = parseInt(parts[3]);
    const basis = parts[4];
    const hq = parts[5];
    const industry = parts[6];
    const decade = parts[7];
    const peak = parseFloat(parts[8]);
    const status = parts[9];
    const multi = parts[10] === 'true';
    const founders = parts[12].replace(/^"|"$/g, '');
    const region = parts[13] || null;
    
    unicorns.push([name, foundedYear, age, basis, hq, industry, founders, decade, peak, status, multi, region]);
  }
}

let output = '    const unicorns = [\n';
for (const u of unicorns) {
    const formattedFounders = u[6].includes("'") ? `"${u[6]}"` : `'${u[6]}'`;
    const formattedRegion = u[11] ? `'${u[11]}'` : 'null';
    output += `      ["${u[0]}", ${u[1]}, ${u[2]}, "${u[3]}", "${u[4]}", "${u[5]}", ${formattedFounders}, "${u[7]}", ${u[8].toFixed(1)}, "${u[9]}", ${u[10]}, ${formattedRegion}],\n`;
}
output += '    ];';

console.log(output);
