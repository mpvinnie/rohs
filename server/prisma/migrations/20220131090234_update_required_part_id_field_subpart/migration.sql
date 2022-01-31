/*
  Warnings:

  - Made the column `part_id` on table `subparts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "subparts" DROP CONSTRAINT "subparts_part_id_fkey";

-- AlterTable
ALTER TABLE "subparts" ALTER COLUMN "part_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "subparts" ADD CONSTRAINT "subparts_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
