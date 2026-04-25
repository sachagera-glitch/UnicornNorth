export interface UnicornRow {
  id: number;
  companyName: string;
  foundedYear: number | null;
  foundedAge: number | null;
  hqCma: string | null;
  industry: string | null;
  founders: string | null;
  firstUnicornDecade: string | null;
  peakValuationCad2025: string | null;
  companyStatus: string | null;
  acquirerRegion: string | null;
  isRevenueMultiplier: boolean;
  lastUpdated: Date;
}

export interface CmaStatRow {
  cma: string;
  decade: string;
  unicornCount: number;
  unicornsPerMillionRes: string | null;
}

export interface CuspRow {
  id: number;
  companyName: string;
  hqCma: string | null;
  sectorFocus: string | null;
  identifiedDate: Date;
}

export interface CmaMetadataRow {
  cma: string;
  lens: string;
  description: string;
}
