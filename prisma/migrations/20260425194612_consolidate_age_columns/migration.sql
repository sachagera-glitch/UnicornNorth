/*
  Warnings:

  - You are about to drop the column `founded_age` on the `unicorns` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "unicorns" DROP COLUMN "founded_age",
ADD COLUMN     "acquirer_region" VARCHAR(50),
ADD COLUMN     "founders" TEXT;

-- CreateTable
CREATE TABLE "cma_metadata" (
    "cma" VARCHAR(100) NOT NULL,
    "lens" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "cma_metadata_pkey" PRIMARY KEY ("cma")
);
