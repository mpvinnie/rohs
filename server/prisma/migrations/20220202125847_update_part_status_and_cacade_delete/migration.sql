/*
  Warnings:

  - The values [WAITING] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('NOT_SENT', 'UNDER_ANALYSIS', 'APPROVED', 'DISAPPROVED');
ALTER TABLE "parts" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "parts" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "parts" ALTER COLUMN "status" SET DEFAULT 'NOT_SENT';
COMMIT;

-- AlterTable
ALTER TABLE "parts" ALTER COLUMN "status" SET DEFAULT E'NOT_SENT';
