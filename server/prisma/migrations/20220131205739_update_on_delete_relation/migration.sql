-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "parts" DROP CONSTRAINT "parts_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "subparts" DROP CONSTRAINT "subparts_part_id_fkey";

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parts" ADD CONSTRAINT "parts_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subparts" ADD CONSTRAINT "subparts_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "parts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
