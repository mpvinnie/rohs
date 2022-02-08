/*
  Warnings:

  - You are about to drop the column `disaproval_reason_id` on the `parts` table. All the data in the column will be lost.
  - The `status` column on the `parts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `disproval_reasons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `parts_under_review` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PartStatus" AS ENUM ('NOT_SENT', 'SENT_FOR_REVIEW', 'UNDER_REVIEW', 'APPROVED', 'DISAPPROVED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "ResolveReview" AS ENUM ('NOT_RESOLVED', 'APPROVED', 'DISAPPROVED');

-- DropForeignKey
ALTER TABLE "parts" DROP CONSTRAINT "parts_disaproval_reason_id_fkey";

-- DropForeignKey
ALTER TABLE "parts_under_review" DROP CONSTRAINT "parts_under_review_manager_id_fkey";

-- DropForeignKey
ALTER TABLE "parts_under_review" DROP CONSTRAINT "parts_under_review_part_id_fkey";

-- DropIndex
DROP INDEX "parts_disaproval_reason_id_key";

-- AlterTable
ALTER TABLE "parts" DROP COLUMN "disaproval_reason_id",
ADD COLUMN     "approval_date" TIMESTAMP(3),
DROP COLUMN "status",
ADD COLUMN     "status" "PartStatus" NOT NULL DEFAULT E'NOT_SENT';

-- DropTable
DROP TABLE "disproval_reasons";

-- DropTable
DROP TABLE "parts_under_review";

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "resolve" "ResolveReview" NOT NULL DEFAULT E'NOT_RESOLVED',
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "manager_id" TEXT NOT NULL,
    "part_id" TEXT NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "managers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "parts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
