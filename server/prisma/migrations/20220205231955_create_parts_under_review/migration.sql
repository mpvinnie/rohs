/*
  Warnings:

  - The values [UNDER_ANALYSIS] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `is_active` on the `parts` table. All the data in the column will be lost.
  - You are about to drop the column `is_blocked` on the `parts` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('NOT_SENT', 'SENT_FOR_REVIEW', 'APPROVED', 'DISAPPROVED', 'EXPIRED');
ALTER TABLE "parts" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "parts" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "parts" ALTER COLUMN "status" SET DEFAULT 'NOT_SENT';
COMMIT;

-- AlterTable
ALTER TABLE "parts" DROP COLUMN "is_active",
DROP COLUMN "is_blocked";

-- CreateTable
CREATE TABLE "parts_under_review" (
    "id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "manager_id" TEXT NOT NULL,
    "part_id" TEXT NOT NULL,

    CONSTRAINT "parts_under_review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "parts_under_review_part_id_key" ON "parts_under_review"("part_id");

-- AddForeignKey
ALTER TABLE "parts_under_review" ADD CONSTRAINT "parts_under_review_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "managers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parts_under_review" ADD CONSTRAINT "parts_under_review_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "parts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
