/*
  Warnings:

  - The `status` column on the `Client` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Asset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClientAsset` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- DropForeignKey
ALTER TABLE "ClientAsset" DROP CONSTRAINT "ClientAsset_assetId_fkey";

-- DropForeignKey
ALTER TABLE "ClientAsset" DROP CONSTRAINT "ClientAsset_clientId_fkey";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';

-- DropTable
DROP TABLE "Asset";

-- DropTable
DROP TABLE "ClientAsset";
