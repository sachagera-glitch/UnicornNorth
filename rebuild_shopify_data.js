// rebuild_shopify_data.js
// Replaces the entire SHOPIFY_DATA array in lineageData.ts with data from Larry's revised table.

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'lineageData.ts');

// Read the file
let content = fs.readFileSync(filePath, 'utf-8');

// Detect line ending
const lineEnding = content.includes('\r\n') ? '\r\n' : '\n';

// The new SHOPIFY_DATA entries, in chronological order
const entries = [
  // Root
  {
    id: 'shopify',
    name: 'Shopify',
    type: 'company',
    year: 2006,
    description: "The modern commerce engine — Canada\\'s most successful contemporary tech giant.",
    isUnicorn: true,
  },

  // 2012
  { id: 'mcgovern-ventures', name: 'McGovern Family Investments', type: 'other', parent: 'shopify', year: 2012, description: 'Family office investment vehicle of Satish Kanwar.', relationship: 'Alumni Fund' },

  // 2013
  { id: 'envoy', name: 'Envoy', type: 'company', parent: 'shopify', year: 2013, description: 'Workplace management.', relationship: 'Alumni Startup' },
  { id: 'stripe', name: 'Stripe', type: 'company', parent: 'shopify', year: 2013, description: 'Powers Shopify Payments and other financials. More than $350M invested since 2013.', relationship: 'Investment in partner' },

  // 2014
  { id: 'order-co', name: 'Order.co', type: 'company', parent: 'shopify', year: 2014, description: 'B2B marketplace & buying.', relationship: 'Alumni Startup' },

  // 2015
  { id: 'kaner-ventures', name: 'Kaner Ventures', type: 'other', parent: 'shopify', year: 2015, description: 'Early-stage venture fund founded by Satish Kanwar.', relationship: 'Alumni Fund' },
  { id: 'mello-ventures', name: 'Mello Ventures', type: 'other', parent: 'shopify', year: 2015, description: 'Ecosystem investment fund founded by Craig Miller.', relationship: 'Alumni Fund' },

  // 2016
  { id: 're-cover', name: 'Re (formerly Cover)', type: 'company', parent: 'shopify', year: 2016, description: 'Blockchain re-insurance.', relationship: 'Alumni Startup' },
  { id: 'rhenti', name: 'Rhenti', type: 'company', parent: 'shopify', year: 2016, description: 'Rental & leasing automation.', relationship: 'Alumni Startup' },

  // 2017
  { id: 'victor-miller-foundation', name: 'Victor Miller Foundation', type: 'other', parent: 'shopify', year: 2017, description: 'Philanthropic funding for developer education.', relationship: 'Alumni Fund' },
  { id: 'archetype', name: 'Archetype', type: 'company', parent: 'shopify', year: 2017, description: 'Tools to design themes etc. (sold 2022).', relationship: 'Alumni Startup' },
  { id: 'clever-few', name: 'Clever Few (Parcelify)', type: 'company', parent: 'shopify', year: 2017, description: 'Custom-shipping rates app for Shopify stores.', relationship: 'Alumni Startup' },
  { id: 'the-good-internet', name: 'The Good Internet', type: 'company', parent: 'shopify', year: 2017, description: 'Network of companies helping creators build.', relationship: 'Alumni Startup' },
  { id: 'nine-and-two', name: 'Nine And Two Consulting', type: 'company', parent: 'shopify', year: 2017, description: 'Consultancy helps companies build partnership programs.', relationship: 'Alumni Startup' },
  { id: 'win-brands', name: 'WIN Brands', type: 'company', parent: 'shopify', year: 2017, description: 'E-commerce brand portfolio.', relationship: 'Alumni Startup' },

  // 2018
  { id: 'convictional', name: 'Convictional', type: 'company', parent: 'shopify', year: 2018, description: 'B2B dropshipping/integration.', relationship: 'Alumni Startup' },
  { id: 'opslevel', name: 'OpsLevel', type: 'company', parent: 'shopify', year: 2018, description: 'Internal developer portals (IDP).', relationship: 'Alumni Startup' },
  { id: 'freedom-robotics', name: 'Freedom Robotics', type: 'company', parent: 'shopify', year: 2018, description: 'Robotics software infrastructure.', relationship: 'Alumni Startup' },
  { id: 'delphia', name: 'Delphia', type: 'company', parent: 'shopify', year: 2018, description: 'Data-driven investment strategy.', relationship: 'Alumni Startup' },
  { id: 'jupiter', name: 'Jupiter', type: 'company', parent: 'shopify', year: 2018, description: 'Software platform in the beauty business (exit 2021).', relationship: 'Alumni Startup' },

  // 2019
  { id: 'roach-capital', name: 'Roach Capital', type: 'other', parent: 'shopify', year: 2019, description: 'Venture capital fund founded by Fahd Ananta.', relationship: 'Alumni Fund' },
  { id: 'bobby', name: 'Bobby', type: 'company', parent: 'shopify', year: 2019, description: 'Game development studio.', relationship: 'Alumni Startup' },
  { id: 'shopify-sustainability', name: 'Shopify Sustainability Fund', type: 'other', parent: 'shopify', year: 2019, description: 'Annual investments in carbon-removal and other initiatives ($100M as of 2025).', relationship: 'Shopify Initiative' },
  { id: 'trexity', name: 'Trexity', type: 'company', parent: 'shopify', year: 2019, description: 'Last-mile delivery & logistics.', relationship: 'Alumni Startup' },
  { id: 'thistledown', name: 'Thistledown Foundation', type: 'other', parent: 'shopify', year: 2019, description: 'C$150M endowment by CEO Tobi Lutke. Investments include General Fusion & Mast Reforest.', relationship: 'Alumni Fund' },
  { id: 'combo', name: 'Combo', type: 'company', parent: 'shopify', year: 2019, description: 'Web-based video editing (exited 2023).', relationship: 'Alumni Startup' },
  { id: 'domaine', name: 'Domaine', type: 'company', parent: 'shopify', year: 2019, description: 'Shopify design & development practice.', relationship: 'Alumni Startup' },
  { id: 'casca', name: 'Casca', type: 'company', parent: 'shopify', year: 2019, description: 'Innovative footwear brand. Led C$4.7M Seed round.', relationship: 'Investment by Shopify staff' },
  { id: 'float', name: 'Float', type: 'company', parent: 'shopify', year: 2019, description: 'Business expense & card platform. C$163M in equity & debt.', relationship: 'Alumni Startup' },

  // 2020
  { id: 'afterword', name: 'Afterword', type: 'company', parent: 'shopify', year: 2020, description: 'End-of-life services & grief tech.', relationship: 'Alumni Startup' },
  { id: 'maple', name: 'Maple', type: 'company', parent: 'shopify', year: 2020, description: 'Household management tech.', relationship: 'Alumni Startup' },
  { id: 'alumworks', name: 'Alumworks', type: 'company', parent: 'shopify', year: 2020, description: 'Built Shopify apps (Alpaca, Thresher, Parrot etc.).', relationship: 'Alumni Startup' },
  { id: 'diem', name: 'Diem Association', type: 'company', parent: 'shopify', year: 2020, description: 'Attempt to launch global stablecoin (exited 2022). $10M to consortium.', relationship: 'Investment' },
  { id: 'affirm', name: 'Affirm Holdings', type: 'company', parent: 'shopify', year: 2020, description: 'Buy-now-pay-later financing. Warrants for shares (IPOed at $2B in 2021).', relationship: 'Investment in partner' },

  // 2021
  { id: 'gadget', name: 'Gadget', type: 'company', parent: 'shopify', year: 2021, description: 'Dev platform for Shopify apps.', relationship: 'Alumni Startup' },
  { id: 'alacart', name: 'Alacart Apps', type: 'company', parent: 'shopify', year: 2021, description: 'Specialists in preparing online items as gifts.', relationship: 'Alumni Startup' },
  { id: 'returnbear', name: 'ReturnBear', type: 'company', parent: 'shopify', year: 2021, description: 'Facilitates returns.', relationship: 'Alumni Startup' },
  { id: 'supergreat', name: 'Supergreat', type: 'company', parent: 'shopify', year: 2021, description: 'Live-streaming social commerce app (acquired by Whatnot.com, exited 2023).', relationship: 'Investment in partner' },
  { id: 'pluto', name: 'Pluto', type: 'company', parent: 'shopify', year: 2021, description: 'Corporate cards & spend management.', relationship: 'Alumni Startup' },
  { id: 'disco', name: 'Disco (Co-op Commerce)', type: 'company', parent: 'shopify', year: 2021, description: 'Post-purchase upsells.', relationship: 'Investment in partner' },
  { id: 'creative-layer', name: 'Creative Layer', type: 'company', parent: 'shopify', year: 2021, description: 'Print-on-demand for personalizing products.', relationship: 'Investment by Shopify staff' },
  { id: 'flow-commerce', name: 'Flow Commerce', type: 'company', parent: 'shopify', year: 2021, description: 'Cross-border e-commerce for small merchants (exited 2021). ~$70M equity stake via Globe-E.', relationship: 'Investment in partner' },
  { id: 'yotpo', name: 'Yotpo', type: 'company', parent: 'shopify', year: 2021, description: 'Trustworthy product reviews. ~$30M investment.', relationship: 'Investment in partner' },
  { id: 'tapcart', name: 'Tapcart', type: 'company', parent: 'shopify', year: 2021, description: 'Enables merchants to make own apps. $50M Series B.', relationship: 'Investment in partner' },
  { id: 'global-e', name: 'Global-E Online', type: 'company', parent: 'shopify', year: 2021, description: 'Supports cross-border sales. 6% equity stake ($490M after 2021 IPO).', relationship: 'Investment in partner' },
  { id: 'bench-accounting', name: 'Bench Accounting', type: 'company', parent: 'shopify', year: 2021, description: 'Financial, tax & bookkeeping services (exited 2024). C$73M Series C.', relationship: 'Investment in partner' },
  { id: 'codat', name: 'Codat', type: 'company', parent: 'shopify', year: 2021, description: 'API to access small business data. $100M round in 2022.', relationship: 'Investment in partner' },
  { id: 'loop-returns', name: 'Loop Returns', type: 'company', parent: 'shopify', year: 2021, description: 'Software for product returns and exchanges. $65M Series B.', relationship: 'Investment in partner' },
  { id: 'highbeam', name: 'Highbeam', type: 'company', parent: 'shopify', year: 2021, description: 'Fintech & banking for brands. $46.2M raised.', relationship: 'Alumni Startup' },
  { id: 'backbone-angels', name: 'Backbone Angels', type: 'other', parent: 'shopify', year: 2021, description: 'Shopify female executives investing in female & diverse founders.', relationship: 'Alumni Fund' },
  { id: 'pipe', name: 'Pipe Technologies', type: 'company', parent: 'shopify', year: 2021, description: 'Lends against recurring revenues. $50M Series B.', relationship: 'Investment in partner' },
  { id: 'swyft', name: 'Swyft', type: 'company', parent: 'shopify', year: 2021, description: 'Connects stores to local couriers for same-day service. C$22M Seed.', relationship: 'Investment in partner' },
  { id: 'gemini-ventures', name: 'Gemini Ventures', type: 'other', parent: 'shopify', year: 2021, description: 'Ecosystem venture capital fund founded by Sergio Anastasidis.', relationship: 'Alumni Fund' },
  { id: 'tindraderm', name: 'Tindraderm', type: 'other', parent: 'shopify', year: 2021, description: 'Invests in medical start-up firms.', relationship: 'Alumni Fund' },
  { id: 'savage-fund', name: 'The Savage Fund', type: 'other', parent: 'shopify', year: 2021, description: 'Philanthropic vehicle established by Harley Finkelstein.', relationship: 'Alumni Fund' },

  // 2022
  { id: 'ultravox-ai', name: 'Ultravox.ai', type: 'company', parent: 'shopify', year: 2022, description: 'Voice-native AI (formerly Fixie AI). $16.5M raised.', relationship: 'Alumni Startup' },
  { id: 'downpay', name: 'Downpay', type: 'company', parent: 'shopify', year: 2022, description: 'Layaway app for made-to-order, high-value products, no credit checks.', relationship: 'Alumni Startup' },
  { id: 'storehero', name: 'StoreHero', type: 'company', parent: 'shopify', year: 2022, description: 'Analytics tool for businesses.', relationship: 'Alumni Startup' },
  { id: 'wati', name: 'WATI', type: 'company', parent: 'shopify', year: 2022, description: 'Personalized notifications via WhatsApp. $23M Series B.', relationship: 'Investment in partner' },
  { id: 'klaviyo', name: 'Klaviyo', type: 'company', parent: 'shopify', year: 2022, description: 'Email marketing. $100M investment.', relationship: 'Investment in partner' },
  { id: 'clean-canvas', name: 'Clean Canvas', type: 'company', parent: 'shopify', year: 2022, description: 'Develop store themes (acquired 2025).', relationship: 'Alumni Startup' },
  { id: 'single', name: 'Single', type: 'company', parent: 'shopify', year: 2022, description: 'Music commerce app.', relationship: 'Investment in partner' },
  { id: 'gorgias', name: 'Gorgias', type: 'company', parent: 'shopify', year: 2022, description: 'AI-driven answers to customer queries plus support chats. Joint lead in $30M Series C.', relationship: 'Investment in partner' },
  { id: 'thirdweb', name: 'Thirdweb', type: 'company', parent: 'shopify', year: 2022, description: 'Web3 tools to simplify building blockchain features. $24M Series A.', relationship: 'Investment in partner' },
  { id: 'saltz', name: 'Saltz', type: 'company', parent: 'shopify', year: 2022, description: 'B2B food distribution marketplace.', relationship: 'Alumni Startup' },
  { id: 'crossing-minds', name: 'Crossing Minds', type: 'company', parent: 'shopify', year: 2022, description: 'AI-powered recommendation engine (acquired 2025 by OpenAI). Led $14.8M investment.', relationship: 'Investment' },
  { id: 'select-startup', name: 'Select', type: 'company', parent: 'shopify', year: 2022, description: 'Optimization and cost control platform (acquired 2026).', relationship: 'Alumni Startup' },
  { id: 'flare-systems', name: 'Flare Systems', type: 'company', parent: 'shopify', year: 2022, description: 'Cyber threat detection. C$9.5M Series A.', relationship: 'Alumni Startup' },
  { id: 'logseq', name: 'Logseq', type: 'company', parent: 'shopify', year: 2022, description: 'Open-source tool to write and connect text-based notes. Led $4.1M Seed.', relationship: 'Investment by Shopify staff' },
  { id: 'centro-commerce', name: 'Centro Commerce', type: 'company', parent: 'shopify', year: 2022, description: 'AI procurement system for inventory & supply chains (acquired 2025). $2M pre-seed.', relationship: 'Alumni Startup' },
  { id: 'growth-crew', name: 'Growth Crew', type: 'company', parent: 'shopify', year: 2022, description: 'Help businesses with their growth and revenue.', relationship: 'Alumni Startup' },
  { id: 'finni-health', name: 'Finni Health', type: 'company', parent: 'shopify', year: 2022, description: 'Autism care & healthcare platform. $3.2M financing.', relationship: 'Alumni Startup' },
  { id: 'abra', name: 'Abra', type: 'company', parent: 'shopify', year: 2022, description: 'App applying discounts automatically at check-out.', relationship: 'Alumni Startup' },
  { id: 'shippo', name: 'Shippo', type: 'company', parent: 'shopify', year: 2022, description: 'Global shipping platform.', relationship: 'Investment in partner' },
  { id: 'citylitics', name: 'Citylitics', type: 'company', parent: 'shopify', year: 2022, description: 'AI tool for finding procurement opportunities in documents. Led C$6.2M Series A.', relationship: 'Investment by Shopify alumni' },
  { id: 'uptime', name: 'Uptime', type: 'company', parent: 'shopify', year: 2022, description: 'Proactive alerts about Shopify issues.', relationship: 'Alumni Startup' },
  { id: 'creator-now', name: 'Creator Now', type: 'company', parent: 'shopify', year: 2022, description: 'Creator economy education. $3M raised.', relationship: 'Alumni Startup' },

  // 2023
  { id: 'faire', name: 'Faire', type: 'company', parent: 'shopify', year: 2023, description: 'Wholesale marketplace for Shopify stores.', relationship: 'Investment in partner' },
  { id: 'vivid-poster', name: 'Vivid Poster', type: 'other', parent: 'shopify', year: 2023, description: 'Investments made by Harley Finkelstein & wife.', relationship: 'Alumni Fund' },
  { id: 'storelocators', name: 'StoreLocators', type: 'company', parent: 'shopify', year: 2023, description: 'Empower brands by unifying their online and offline presence.', relationship: 'Alumni Startup' },
  { id: 'mantle', name: 'Mantle', type: 'company', parent: 'shopify', year: 2023, description: 'Solutions for managing private assets. $10.5M Seed.', relationship: 'Alumni Startup' },
  { id: 'trig-ai', name: 'Trig.ai', type: 'company', parent: 'shopify', year: 2023, description: 'AI-driven account management. $8M Seed (2025), $2M pre-Seed (2023).', relationship: 'Alumni Startup' },
  { id: 'turbopuffer', name: 'Turbopuffer', type: 'company', parent: 'shopify', year: 2023, description: 'Fast AI search engine that cuts costs and scales.', relationship: 'Alumni Startup', isUnicorn: true },
  { id: 'storycraft', name: 'Storycraft', type: 'company', parent: 'shopify', year: 2023, description: 'AI-powered game building. $5M raised to date.', relationship: 'Alumni Startup' },
  { id: 'nomba', name: 'Nomba', type: 'company', parent: 'shopify', year: 2023, description: 'Financial services for African merchants. $30M pre-Series B.', relationship: 'Investment' },
  { id: 'teal', name: 'Teal', type: 'company', parent: 'shopify', year: 2023, description: 'SaaS-embedded bookkeeping (acquired 2024). Over $11M raised.', relationship: 'Alumni Startup' },
  { id: 'hubtree', name: 'HubTree Talent', type: 'company', parent: 'shopify', year: 2023, description: 'Talent recruitment.', relationship: 'Alumni Startup' },
  { id: 'ask-kenna', name: 'Ask Kenna', type: 'company', parent: 'shopify', year: 2023, description: 'Consulting service for users of Shopify Plus.', relationship: 'Alumni Startup' },
  { id: 'flexport', name: 'Flexport', type: 'company', parent: 'shopify', year: 2023, description: 'Shipments of merchant orders. 20% equity stake via Shopify Fulfilment Network transfer.', relationship: 'Investment in partner' },
  { id: 'soarce', name: 'Soarce Consulting', type: 'company', parent: 'shopify', year: 2023, description: 'Staffing & recruiting for tech and e-commerce firms.', relationship: 'Alumni Startup' },
  { id: 'data-gardeners', name: 'Data Gardeners', type: 'company', parent: 'shopify', year: 2023, description: 'Mining databases for insights and monetization.', relationship: 'Alumni Startup' },
  { id: 'triple-whale', name: 'Triple Whale', type: 'company', parent: 'shopify', year: 2023, description: 'Consolidates analytics in one place and applies AI. $25M Series B.', relationship: 'Investment in partner' },
  { id: 'boom-video', name: 'Boom Video', type: 'company', parent: 'shopify', year: 2023, description: 'App for studio quality videos over Zoom etc.', relationship: 'Alumni Startup' },

  // 2024
  { id: 'reactiv', name: 'Reactiv', type: 'company', parent: 'shopify', year: 2024, description: 'Native iOS and Android apps. Over $5M in seed funding.', relationship: 'Alumni Startup' },
  { id: 'lightdash', name: 'Lightdash', type: 'company', parent: 'shopify', year: 2024, description: 'AI business intelligence tool. $11M raise.', relationship: 'Investment in partner' },
  { id: 'convergence', name: 'Convergence', type: 'company', parent: 'shopify', year: 2024, description: 'AI agents (acquired by Salesforce). $12M Seed.', relationship: 'Alumni Startup' },
  { id: 'symmetry-commerce', name: 'Symmetry Commerce', type: 'company', parent: 'shopify', year: 2024, description: 'E-commerce migrations & custom integrations.', relationship: 'Alumni Startup' },
  { id: 'physical-intelligence', name: 'Physical Intelligence', type: 'company', parent: 'shopify', year: 2024, description: 'AI models for robots to learn vs. being programmed.', relationship: 'Investment in partner' },
  { id: 'lantern', name: 'Lantern', type: 'company', parent: 'shopify', year: 2024, description: 'Engagement and retention on Shopify. $6.8M seed.', relationship: 'Alumni Startup' },
  { id: 'magnate-ventures', name: 'Magnate Ventures', type: 'company', parent: 'shopify', year: 2024, description: 'Holding co building & investing in businesses.', relationship: 'Alumni Startup' },
  { id: 'page', name: 'Page', type: 'company', parent: 'shopify', year: 2024, description: 'Advanced tech & AI for insight into government activities. $4.1M seed.', relationship: 'Alumni Startup' },
  { id: 'liquid-ai', name: 'Liquid AI', type: 'company', parent: 'shopify', year: 2024, description: 'AI recommender & search models. $250M Series A.', relationship: 'Investment in partner' },
  { id: 'melio', name: 'Melio', type: 'company', parent: 'shopify', year: 2024, description: 'B2B payments platform (exit 2025). $150M Series E.', relationship: 'Investment in partner' },

  // 2025
  { id: 'synthetic-ai', name: 'Synthetic.ai', type: 'company', parent: 'shopify', year: 2025, description: 'Autonomous AI bookkeeping for startups. $10M Seed.', relationship: 'Alumni Startup' },
  { id: 'sparrow-bioacoustics', name: 'Sparrow BioAcoustics', type: 'company', parent: 'shopify', year: 2025, description: 'App turns smartphone into stethoscope. Led C$10M financing.', relationship: 'Investment by Shopify alumni' },
  { id: 'tilt', name: 'Tilt', type: 'company', parent: 'shopify', year: 2025, description: 'Investment tools and AI to build indexes quickly. $7.1M Seed.', relationship: 'Alumni Startup' },
  { id: 'augment', name: 'Augment', type: 'company', parent: 'shopify', year: 2025, description: 'AI agents for logistics/freight.', relationship: 'Alumni Startup' },
  { id: 'tempo', name: 'Tempo', type: 'company', parent: 'shopify', year: 2025, description: 'Layer-1 blockchain.', relationship: 'Investment in partner' },
  { id: 'fal-ai', name: 'Fal.ai', type: 'company', parent: 'shopify', year: 2025, description: 'Multimodal AI models for developers. $125M Series C.', relationship: 'Investment in partner' },
  { id: 'sanity', name: 'Sanity', type: 'company', parent: 'shopify', year: 2025, description: 'Headless Content Management. $85M Series C.', relationship: 'Investment in partner' },
  { id: 'graphite', name: 'Graphite', type: 'company', parent: 'shopify', year: 2025, description: 'AI coding tool for developers (exited). $52M Series B.', relationship: 'Investment in partner' },
  { id: 'medda', name: 'Medda Technologies', type: 'company', parent: 'shopify', year: 2025, description: 'Digital platform for medical staff to access patient health histories.', relationship: 'Alumni Startup' },
  { id: 'fundthrough', name: 'FundThrough', type: 'company', parent: 'shopify', year: 2025, description: 'Fintech invoice factoring for SMBs. Led $25M Series B.', relationship: 'Investment by Shopify alumni' },
  { id: 'whalar', name: 'Whalar Group', type: 'company', parent: 'shopify', year: 2025, description: 'Infrastructure for creator businesses.', relationship: 'Investment in partner' },
  { id: 'settle', name: 'Settle', type: 'company', parent: 'shopify', year: 2025, description: 'B2B e-commerce finance tool.', relationship: 'Investment in partner' },
  { id: 'crstl', name: 'Crstl', type: 'company', parent: 'shopify', year: 2025, description: 'Agentic B2B commerce network. $10M Series A.', relationship: 'Investment in partner' },
  { id: 'reown', name: 'Reown', type: 'company', parent: 'shopify', year: 2025, description: 'Crypto user interface. $13M Series B.', relationship: 'Investment in partner' },

  // 2026
  { id: 'gumloop', name: 'Gumloop', type: 'company', parent: 'shopify', year: 2026, description: 'AI automation for e-commerce. $50M Series B.', relationship: 'Investment in partner' },
  { id: 'stilla-ai', name: 'Stilla AI', type: 'company', parent: 'shopify', year: 2026, description: 'AI agent keeps track of what was said, to do and in motion. $5M Seed.', relationship: 'Alumni Startup' },
  { id: 'sapiom', name: 'Sapiom', type: 'company', parent: 'shopify', year: 2026, description: 'Give AI agents secure access to APIs so can buy, sell & negotiate. $15.8M Seed.', relationship: 'Alumni Startup' },
];

// Build the new SHOPIFY_DATA string
function entryToString(entry, indent) {
  indent = indent || '  ';
  const lines = [];
  lines.push(indent + '{');
  
  lines.push(indent + '  id: \'' + entry.id + '\',');
  lines.push(indent + '  name: \'' + entry.name.replace(/'/g, "\\'") + '\',');
  lines.push(indent + '  type: \'' + entry.type + '\',');
  if (entry.parent) {
    lines.push(indent + '  parent: \'' + entry.parent + '\',');
  }
  if (entry.year) {
    lines.push(indent + '  year: ' + entry.year + ',');
  }
  if (entry.description) {
    lines.push(indent + '  description: \'' + entry.description.replace(/'/g, "\\'") + '\',');
  }
  if (entry.relationship) {
    lines.push(indent + '  relationship: \'' + entry.relationship + '\',');
  }
  if (entry.isUnicorn) {
    lines.push(indent + '  isUnicorn: true,');
  }
  
  lines.push(indent + '},');
  return lines.join(lineEnding);
}

// Generate the full SHOPIFY_DATA block
const entryStrings = entries.map(function(e) { return entryToString(e); });
const newShopifyData = 'export const SHOPIFY_DATA: LineageNode[] = [' + lineEnding + entryStrings.join(lineEnding) + lineEnding + '];';

// Find and replace the SHOPIFY_DATA block in the file
const startMarker = 'export const SHOPIFY_DATA: LineageNode[] = [';
const startIdx = content.indexOf(startMarker);

if (startIdx === -1) {
  console.error('ERROR: Could not find SHOPIFY_DATA start marker');
  process.exit(1);
}

// Find the matching closing '];'
let bracketCount = 0;
let endIdx = -1;

for (let i = startIdx + startMarker.length; i < content.length; i++) {
  const ch = content[i];
  
  if (ch === '[') bracketCount++;
  if (ch === ']') {
    if (bracketCount === 0) {
      let semiIdx = i + 1;
      while (semiIdx < content.length && content[semiIdx] !== ';') semiIdx++;
      endIdx = semiIdx + 1;
      break;
    }
    bracketCount--;
  }
}

if (endIdx === -1) {
  console.error('ERROR: Could not find SHOPIFY_DATA end marker');
  process.exit(1);
}

// Replace the content
const before = content.substring(0, startIdx);
const after = content.substring(endIdx);

const newContent = before + newShopifyData + after;

// Write the file
fs.writeFileSync(filePath, newContent, 'utf-8');

console.log('SUCCESS: Updated SHOPIFY_DATA with ' + entries.length + ' entries.');
console.log('File written to: ' + filePath);

// Count by category
const categories = {};
entries.forEach(function(e) {
  const cat = e.relationship || (e.isUnicorn ? 'Root/Unicorn' : 'Root');
  categories[cat] = (categories[cat] || 0) + 1;
});
console.log('');
console.log('Entries by category:');
Object.entries(categories).sort(function(a,b) { return b[1] - a[1]; }).forEach(function(pair) {
  console.log('  ' + pair[0] + ': ' + pair[1]);
});
