-- CreateTable
CREATE TABLE "unicorns" (
    "id" SERIAL NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "hq_cma" VARCHAR(100),
    "industry" VARCHAR(100),
    "first_unicorn_decade" VARCHAR(20),
    "peak_valuation_cad_2025" DECIMAL(20,2),
    "company_status" VARCHAR(50),
    "is_revenue_multiplier" BOOLEAN NOT NULL DEFAULT false,
    "last_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "unicorns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cma_decade_stats" (
    "cma" VARCHAR(100) NOT NULL,
    "decade" VARCHAR(20) NOT NULL,
    "unicorn_count" INTEGER NOT NULL,
    "unicorns_per_million_res" DECIMAL(10,2),

    CONSTRAINT "cma_decade_stats_pkey" PRIMARY KEY ("cma","decade")
);

-- CreateTable
CREATE TABLE "companies_on_cusp" (
    "id" SERIAL NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "hq_cma" VARCHAR(100),
    "sector_focus" VARCHAR(255),
    "identified_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_on_cusp_pkey" PRIMARY KEY ("id")
);
