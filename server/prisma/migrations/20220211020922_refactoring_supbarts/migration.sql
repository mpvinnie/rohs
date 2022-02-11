/*
  Warnings:

  - You are about to drop the column `approval_date` on the `parts` table. All the data in the column will be lost.
  - The `resolve` column on the `reviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `fisp_msds` on the `subparts` table. All the data in the column will be lost.
  - You are about to drop the column `gwi_11a1` on the `subparts` table. All the data in the column will be lost.
  - You are about to drop the column `subgroup_id` on the `subparts` table. All the data in the column will be lost.
  - You are about to drop the `subgroups` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fispq_msds` to the `subparts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gwi4_11a1` to the `subparts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material_type_id` to the `subparts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rohs_report_date` to the `subparts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rohs_report_expiration_date` to the `subparts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MaterialTypeName" AS ENUM ('METAL', 'PLASTIC', 'PAPER', 'TAPE');

-- CreateEnum
CREATE TYPE "ReviewResolve" AS ENUM ('NOT_RESOLVED', 'APPROVED', 'DISAPPROVED');

-- DropForeignKey
ALTER TABLE "subparts" DROP CONSTRAINT "subparts_subgroup_id_fkey";

-- AlterTable
ALTER TABLE "parts" DROP COLUMN "approval_date";

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "resolve",
ADD COLUMN     "resolve" "ReviewResolve" NOT NULL DEFAULT E'NOT_RESOLVED';

-- AlterTable
ALTER TABLE "subparts" DROP COLUMN "fisp_msds",
DROP COLUMN "gwi_11a1",
DROP COLUMN "subgroup_id",
ADD COLUMN     "fispq_msds" TEXT NOT NULL,
ADD COLUMN     "gwi4_11a1" TEXT NOT NULL,
ADD COLUMN     "material_type_id" TEXT NOT NULL,
ADD COLUMN     "rohs_report_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "rohs_report_expiration_date" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "subgroups";

-- DropEnum
DROP TYPE "ResolveReview";

-- CreateTable
CREATE TABLE "material_types" (
    "id" TEXT NOT NULL,
    "name" "MaterialTypeName" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "material_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "material_types_name_key" ON "material_types"("name");

-- AddForeignKey
ALTER TABLE "subparts" ADD CONSTRAINT "subparts_material_type_id_fkey" FOREIGN KEY ("material_type_id") REFERENCES "material_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
